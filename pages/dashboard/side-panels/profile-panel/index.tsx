import { Button, Slider, Typography } from "@mui/material";
import { ref } from "firebase/storage";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import SlidingPanel from "react-sliding-side-panel";
import cancelIcon from "../../../../assets/cancel.svg";
import { storage } from "../../../../firebase";
import {
  PanelEnums, useDashboardContextValue
} from "../../context/dashboard-context";
import { PanelHeader } from "../../panel-header";
import { getCroppedImg, getRotatedImage } from "../../utils/canvas-utils";
import { FileUploader } from "./file-uploader";
import { useDispatch, useSelector } from "react-redux";
import {
  selectpage, setPageCoverImage, setPageImage
} from "../../../../redux/features/page-data/page-data.slice";
import { ProfileImage } from "./profile-image";
import { CoverImage } from "./cover-image";
import { ImageCropper } from "./image-cropper";

const ORIENTATION_TO_ANGLE: any = {
  "3": 180, "6": 90, "8": -90
};

export const enum ActiveUpload {
  PROFILE_IMAGE = "PROFILE-IMAGE", COVER_IMAGE = "COVER-IMAGE"
}

export const ProfilePanel = () => {
  const { panelState } = useDashboardContextValue();
  const [fileUploaded, setFileUploaded] = useState<any>();

  const [imageSrc, setImageSrc] = useState(null);
  const [activeUpload, setActiveUpload] = useState<string | null>(null);
  const [profileImageSrc, setProfileImageSrc] = useState(null);
  const [coverImageSrc, setCoverImageSrc] = useState(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<any>(0);
  const [zoom, setZoom] = useState<any>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [croppedImage, setCroppedImage] = useState<any>();
  const [sliderState, setSliderState] = useState<string>("SCALE");


  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const dispatch = useDispatch();
  const pageState = useSelector(selectpage);
  const initialHeight = 60;
  const activeCropHeight = 100;
  const [panelHeight, setPanelHeight] = useState<number>(initialHeight)
  function readFile(file: any) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const onFileChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl: any = await readFile(file);
      console.log("FILE:::", imageDataUrl);
      // apply rotation if needed
      // const orientation = await getOrientation(file);
      // const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }
      console.log("EVENT::", e.target.name);
      if (e.target.name == ActiveUpload.COVER_IMAGE) {
        setActiveUpload(ActiveUpload.COVER_IMAGE);
        setPanelHeight(activeCropHeight)
        setCoverImageSrc(imageDataUrl);
      } else {
        setActiveUpload(ActiveUpload.PROFILE_IMAGE);
        setProfileImageSrc(imageDataUrl);
      }
    }
  };


  const saveImage = async (event: any) => {
    event.preventDefault();
    const img = activeUpload === ActiveUpload.PROFILE_IMAGE ? profileImageSrc : coverImageSrc
    try {
      const croppedImage = await getCroppedImg(img, croppedAreaPixels, rotation);
      console.log("SAVEEEE", croppedImage);
      dispatch( activeUpload === ActiveUpload.PROFILE_IMAGE ?  setPageImage(croppedImage): setPageCoverImage(croppedImage));
      reset();
    } catch (e) {
      console.log(e);
    }
    //console.log("SAVEEEE", croppedImage);

  };

  const reset = () => {
    setActiveUpload(null);
    setImageSrc(null);
    setCroppedImage(null);
    setProfileImageSrc(null);
    setCoverImageSrc(null);
    setRotation(0)
    setPanelHeight(initialHeight)
  };
  useEffect(() => {
    console.log(fileUploaded, "seeeeeeeeeeeeeeeenn");
  }, [fileUploaded]);


  return (<div className="fixed z-50">

    <div className="relative z-50">
      <div className="fixed bottom-0 ">
        <SlidingPanel
          // panelClassName="dashboard-panel"
          type="bottom"
          isOpen={panelState === PanelEnums.PROFILE}
          size={panelHeight}
        >
          <>
            <>
              {activeUpload ? (
                <ImageCropper reset={reset} saveImage={saveImage} crop={crop}
                              setCrop={setCrop}
                              image={activeUpload === ActiveUpload.PROFILE_IMAGE ? profileImageSrc : coverImageSrc}
                              activeUpload={activeUpload}
                              onCropComplete={onCropComplete}
                              rotation={rotation}
                              zoom={zoom}
                              onChange={onFileChange}
                              setRotation={setRotation}
                              setZoom={setZoom}
                />) : (<>
                <div className="profile-panel ">
                  <PanelHeader title="Profile" />
                  <form action="" className="p-5 profile-form">
                    <div
                      className="image-upload flex align-center place-content-between space-x-2 h-24 ">
                      <ProfileImage image={pageState.profileImage}
                                    onChange={onFileChange} />
                      <CoverImage image={pageState.coverImage}
                                  onChange={onFileChange} />
                    </div>
                    <div className="my-8">
                      <label className="block mb-2 text-sm text-gray-200"
                             htmlFor="name">
                        Name
                      </label>
                      <input
                        autoComplete="off"
                        className="w-full px-4 py-3 text-base leading-tight text-white bg-transparent border border-gray-500 border-solid shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="my-4">
                      <label
                        className="block mb-2 text-sm text-gray-200"
                        htmlFor="bioDescription"
                      >
                        Bio Description
                      </label>
                      <input
                        autoComplete="off"
                        className="w-full px-4 py-3 text-base leading-tight text-white bg-transparent border border-gray-500 border-solid shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="bioDescription"
                        type="text"
                        placeholder="Bio Description"
                      />
                    </div>
                  </form>
                </div>
              </>)}
            </>

          </>
        </SlidingPanel>
      </div>
    </div>
  </div>);
};
