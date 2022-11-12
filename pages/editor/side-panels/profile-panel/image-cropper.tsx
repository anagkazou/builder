import Image from "next/image";
import React, { useRef, useState } from "react";
import cancelIcon from "../../../../assets/cancel.svg";
import { Button, Slider, Typography } from "@mui/material";
import Cropper from "react-easy-crop";
import { ActiveUpload } from "./index";

type ImageCropperType = {
  image: any, onChange: any
  reset: () => void, zoom: any, saveImage: any, crop: any, rotation: any, setCrop: any, activeUpload: string, onCropComplete: any, setRotation: any, setZoom: any,

}
export const ImageCropper: React.FC<ImageCropperType> = ({
                                                           reset,
                                                           saveImage,
                                                           zoom,
                                                           crop,
                                                           image,
                                                           rotation,
                                                           setCrop,
                                                           activeUpload,
                                                           onCropComplete,
                                                           setRotation,
                                                           setZoom
                                                         }) => {

  const hiddenFileInput = useRef<any>(null);
  const [sliderState, setSliderState] = useState<string>("SCALE");

  const handleClick = (event: any) => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const readFile = (file: Blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };
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
          aspect={activeUpload === ActiveUpload.PROFILE_IMAGE ? 1 : 3/2}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          cropShape={activeUpload === ActiveUpload.PROFILE_IMAGE ?"round" : "rect"}
        />
      </div>
      <div className="controls">
        <div className="slider__wrapper">
          {sliderState === "SCALE" ? (<>
            <Typography>Zoom</Typography>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </>) : (<>
            <Typography variant="overline">Rotation</Typography>
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

  );
};