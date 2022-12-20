import Image from "next/image";
import React, { useCallback, useState } from "react";
import cancelIcon from "../../../../assets/cancel.svg";
import { Button, Slider, Typography } from "@mui/material";
import Cropper from "react-easy-crop";
import { ActiveUpload } from "./index";
import { getCroppedImg } from "../../utils/canvas-utils";
import {
  setCustomLinkImage, setPageCoverImage, setPageImage
} from "../../../../redux/features/editor/editor.slice";
import { useDispatch } from "react-redux";

type ImageCropperType = {
  image: any, onChange: any
  reset: () => void, rotation: any, activeUpload: string, setRotation: any, index?: number
}
export const ImageCropper: React.FC<ImageCropperType> = ({
                                                           reset,
                                                           image,
                                                           rotation,
                                                           activeUpload,
                                                           setRotation,
                                                           index
                                                         }) => {

  // const hiddenFileInput = useRef<any>(null);
  const [sliderState, setSliderState] = useState<string>("SCALE");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<any>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const dispatch = useDispatch();

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const saveImage = async (event: any) => {
    event.preventDefault();
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation);
      dispatch(activeUpload === ActiveUpload.PROFILE_IMAGE ? setPageImage(croppedImage) : activeUpload === ActiveUpload.LINK_IMAGE ?
        setCustomLinkImage({
        index, data: croppedImage
      }) : setPageCoverImage(croppedImage));
      reset();
    } catch (e) {
      console.log(e);
    }

  };
  // const handleClick = (event: any) => {
  //   hiddenFileInput.current.click();
  // };
  // // Call a function (passed as a prop from the parent component)
  // // to handle the user-selected file
  // const readFile = (file: Blob) => {
  //   return new Promise((resolve) => {
  //     const reader = new FileReader();
  //     reader.addEventListener("load", () => resolve(reader.result), false);
  //     reader.readAsDataURL(file);
  //   });
  // };
  return (<React.Fragment>
      <div className="cropper__header">
        <div
          className="flex items-center cropper__header--right ">
          <button className="mr-4"
                  onClick={reset}>
            <Image width={28} height={28} src={cancelIcon} />
          </button>
          <Typography>Crop Photo</Typography>
        </div>

        <Button
          onClick={(event) => saveImage(event)}>Save</Button>
      </div>
      <div className="cropper__wrapper">
        <Cropper
          image={image}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={activeUpload === (ActiveUpload.PROFILE_IMAGE ) || activeUpload === ActiveUpload.LINK_IMAGE ? 1 : 3 / 2}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          cropShape={activeUpload === ActiveUpload.PROFILE_IMAGE ? "round" : "rect"}
        />
      </div>
      <div className="controls absolute bottom-0 bg-white w-full pt-2">
        <div className="slider__wrapper">
          {sliderState === "SCALE" ? (<>
            <div className="text-sm">Zoom</div>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </>) : (<>
            <div className="text-sm">Rotation</div>
            <Slider
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="Rotation"
              onChange={(e, rotation) => setRotation(rotation)}
            />
          </>)}
        </div>

        <div className="toggle-slider">
          <button
            className="toggle-slider__option text-sm"
            onClick={() => setSliderState("ROTATE")}
          >
            Rotate
          </button>
          <button
            onClick={() => setSliderState("SCALE")}
            className="toggle-slider__option text-sm"
          >
            Scale
          </button>
        </div>
        {/* <Button onClick={showCroppedImage} variant="contained" color="primary">
                Show Result
              </Button> */}
      </div>
    </React.Fragment>

  );
};