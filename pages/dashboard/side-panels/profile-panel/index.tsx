import { Button, Slider, Typography } from "@mui/material";
import { ref } from "firebase/storage";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import SlidingPanel from "react-sliding-side-panel";
import cancelIcon from "../../../../assets/cancel.svg";
import { storage } from "../../../../firebase";
import { PanelEnums, useDashboardContextValue } from "../../context/dashboard-context";
import { PanelHeader } from "../../panel-header";
import { getCroppedImg, getRotatedImage } from "../../utils/canvas-utils";
import { FileUploader } from "./file-uploader";

const ORIENTATION_TO_ANGLE: any = {
  "3": 180,
  "6": 90,
  "8": -90,
};

export const ProfilePanel = () => {
  const { panelState } = useDashboardContextValue();
  const [fileUploaded, setFileUploaded] = useState<any>();

  const [imageSrc, setImageSrc] = React.useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<any>(0);
  const [zoom, setZoom] = useState<any>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [sliderState, setSliderState] = useState<string>("SCALE");

  const [imageUpload, setImageUpload] = useState<any>(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "images/");

  //const dispatch = useDispatch

  const uploadFile = () => {};

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage: any = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

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

      // apply rotation if needed
      // const orientation = await getOrientation(file);
      // const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }

      setImageSrc(imageDataUrl);
    }
  };

  useEffect(() => {
    console.log(fileUploaded, "seeeeeeeeeeeeeeeenn");
  }, [fileUploaded]);

  return (
    <div className="fixed z-50">

    <div className="relative z-50">
      <div className="fixed bottom-0 ">
        <SlidingPanel
          // panelClassName="dashboard-panel"
          type="bottom"
          isOpen={panelState === PanelEnums.PROFILE}
          size={60}
        >
          <>
            {imageSrc ? (
              <React.Fragment>
                <div className="cropper__header">
                  <div className="flex items-center cropper__header--right ">
                    <button className="mr-4" onClick={() => setImageSrc(null)}>
                      <Image width={28} height={28} src={cancelIcon} />
                    </button>
                    <Typography>Crop Photo</Typography>
                  </div>

                  <Button>Save</Button>
                </div>
                <div className="cropper__wrapper">
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    rotation={rotation}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    cropShape="round"
                  />
                </div>
                <div className="controls">
                  <div className="slider__wrapper">
                    {sliderState === "SCALE" ? (
                      <>
                        <Typography>Zoom</Typography>
                        <Slider
                          value={zoom}
                          min={1}
                          max={3}
                          step={0.1}
                          aria-labelledby="Zoom"
                          onChange={(e, zoom) => setZoom(zoom)}
                        />
                      </>
                    ) : (
                      <>
                        <Typography variant="overline">Rotation</Typography>
                        <Slider
                          value={rotation}
                          min={0}
                          max={360}
                          step={1}
                          aria-labelledby="Rotation"
                          onChange={(e, rotation) => setRotation(rotation)}
                        />
                      </>
                    )}
                  </div>

                  <div className="toggle-slider">
                    <button
                      className="toggle-slider__option"
                      onClick={() => setSliderState("ROTATE")}
                    >
                      Rotate
                    </button>
                    <button
                      onClick={() => setSliderState("SCALE")}
                      className="toggle-slider__option"
                    >
                      Scale
                    </button>
                  </div>
                  {/* <Button onClick={showCroppedImage} variant="contained" color="primary">
                Show Result
              </Button> */}
                </div>
              </React.Fragment>
            ) : (
              <>
                <div className="profile-panel ">
                  <PanelHeader  title="Profile" />
                  <form action="" className="p-5 profile-form">
                    <FileUploader
                      setFileUploaded={setFileUploaded}
                      onChange={onFileChange}
                    />
                    <div className="my-8">
                      <label className="block mb-2 text-sm text-gray-200" htmlFor="name">
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
              </>
            )}
          </>
        </SlidingPanel>
      </div>
    </div>
    </div>
  );
};
