import Cropper from "react-easy-crop";
import { Slider } from "@mui/material";
import React, { useCallback, useState } from "react";
import { getCroppedImg } from "./utils/canvas-utils";

const ORIENTATION_TO_ANGLE: any = {
  "3": 180,
  "6": 90,
  "8": -90,
};


type ImageCropperType = { img: any, setFileUploaded: any };


export const ImageCropper: React.FC<ImageCropperType> = ({ img }) => {
  const [imageSrc, setImageSrc] = useState<any | null>(img);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [croppedImage, setCroppedImage] = useState<any>(null);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

 
 
  return (
    <div className="App block">
      <div className="crop-container">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          cropShape="round"
          showGrid={false}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="controls">
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e: any, zoom: any) => setZoom(zoom)}
          //  classes={{ container: 'slider' }}
        />
      </div>
    </div>
  );
};
