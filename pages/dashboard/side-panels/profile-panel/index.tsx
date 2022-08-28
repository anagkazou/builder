import { Button, Slider, Typography } from "@mui/material";
import { readFile } from "fs";
import { getOrientation } from "get-orientation";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import SlidingPanel from "react-sliding-side-panel";
import { useDashboardContextValue, PanelEnums } from "../../context/dashboard-context";
import { ImageCropper } from "../../image-cropper";
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
    <SlidingPanel type="right" isOpen={panelState === PanelEnums.PROFILE} size={100}>
      <>
        {imageSrc ? (
          <React.Fragment>
            <div className="cropper__header">Cropper</div>
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
                showGrid={false}
              />
            </div>
            <div className="controls">
              {sliderState === "SCALE" ? (
                <div>
                  <Typography variant="overline">Zoom</Typography>
                  <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e, zoom) => setZoom(zoom)}
                  />
                </div>
              ) : (
                <div>
                  <Typography variant="overline">Rotation</Typography>
                  <Slider
                    value={rotation}
                    min={0}
                    max={360}
                    step={1}
                    aria-labelledby="Rotation"
                    onChange={(e, rotation) => setRotation(rotation)}
                  />
                </div>
              )}
              <div className="toggle-slider">
                <button className="toggle-slider__option">Rotate</button>
                <button className="toggle-slider__option">Scale</button>
              </div>
              <Button onClick={showCroppedImage} variant="contained" color="primary">
                Show Result
              </Button>
            </div>
          </React.Fragment>
        ) : (
          <>
            <div className="profile-panel">
              <PanelHeader title="Profile" />

              <form action="" className="profile-form">
                <FileUploader onChange={onFileChange} setFileUploaded={setFileUploaded} />
              </form>
            </div>
          </>
        )}
      </>
    </SlidingPanel>
  );
};
