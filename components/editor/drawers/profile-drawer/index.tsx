import React, { useCallback, useEffect, useState } from "react";
import { getCroppedImg, getRotatedImage } from "../../utils/canvas-utils";
import { useDispatch, useSelector } from "react-redux";
import {
  Editor, selectEditor, selectPage, setPageCoverImage, setPageImage, setPageMeta
} from "../../../../redux/features/editor/editor.slice";

import { ProfileImage } from "./profile-image";
import { CoverImage } from "./cover-image";
import { ImageCropper } from "./image-cropper";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import InputComponent from "../../../input.component";
import {
  selectUiState, setInputElementInFocus
} from "../../../../redux/features/ui-state/ui-state.slice";
import { DrawerEnums } from "../../../../enums";
import { BaseDrawer } from "../base-drawer";

const ORIENTATION_TO_ANGLE: any = {
  "3": 180, "6": 90, "8": -90
};

export const enum ActiveUpload {
  PROFILE_IMAGE = "PROFILE-IMAGE", COVER_IMAGE = "COVER-IMAGE"
}

export const ProfileDrawer = () => {
  const [, setImageSrc] = useState(null);
  const [activeUpload, setActiveUpload] = useState<string | null>(null);
  const [profileImageSrc, setProfileImageSrc] = useState(null);
  const [coverImageSrc, setCoverImageSrc] = useState(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<any>(0);
  const [zoom, setZoom] = useState<any>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [, setCroppedImage] = useState<any>();


  function readFile(file: any) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const dispatch = useDispatch();
  const pageState = useSelector(selectEditor).page;
  const initialHeight = 60;
  const activeCropHeight = 100;
  const [, setPanelHeight] = useState<number>(initialHeight);

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
        setPanelHeight(activeCropHeight);
        setCoverImageSrc(imageDataUrl);
      } else {
        setActiveUpload(ActiveUpload.PROFILE_IMAGE);
        setProfileImageSrc(imageDataUrl);
      }
    }
  };


  const saveImage = async (event: any) => {
    event.preventDefault();
    const img = activeUpload === ActiveUpload.PROFILE_IMAGE ? profileImageSrc : coverImageSrc;
    try {
      const croppedImage = await getCroppedImg(img, croppedAreaPixels, rotation);
      dispatch(activeUpload === ActiveUpload.PROFILE_IMAGE ? setPageImage(croppedImage) : setPageCoverImage(croppedImage));
      reset();
    } catch (e) {
      console.log(e);
    }

  };

  const reset = () => {
    setActiveUpload(null);
    setImageSrc(null);
    setCroppedImage(null);
    setProfileImageSrc(null);
    setCoverImageSrc(null);
    setRotation(0);
    setPanelHeight(initialHeight);
    setInputFieldInFocus(null);

    // setTemp(pageInfo);
  };

  const [inputFieldInFocus, setInputFieldInFocus] = useState<any>(null);
  const page = useSelector(selectPage);


  const [temp, setTemp] = useState<Editor>();
  //Todo: Explore using refs to store this value
  const [pageInfoState, setPageInfoState] = useState<typeof page.pageMeta>(page.pageMeta);
  const [saved, setSaved] = useState<boolean>(false);
  const isKeyboardOpen = useDetectKeyboardOpen();
  const inputRefs: any = {};
  const { drawerState } = useSelector(selectUiState);

  useEffect(() => {
    if (saved) {
      console.log("touched");
      dispatch(setPageMeta(pageInfoState));
      Object.values(inputRefs).forEach((el: any) => el.blur());

    }
  }, [saved]);

  useEffect(() => {

    if (!isKeyboardOpen) { // @ts-ignore
      Object.values(inputRefs).forEach((el: any) => {
        el?.blur();
      });
    }
    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        savePageMeta();

      }
    });

    return () => {
      document.removeEventListener("keydown", savePageMeta);
    };
  }, [isKeyboardOpen]);

  const handleFocus = (inputInFocus: any) => {
    setTemp(inputRefs[inputInFocus].value);
    setInputFieldInFocus(inputInFocus);
    dispatch(setInputElementInFocus(true))

  };
  const handleChange = (event: any) => {
    setSaved(false);
    const value = event.target.value;

    //TOdo: this is very wrong...
    setPageInfoState((prevState: any) => ({
      ...prevState, [inputFieldInFocus]: value
    }));
    console.log(value);
  };
  const clearInputField = () => {
    // event.preventDefault();
    console.log(inputFieldInFocus, "touched!!!!! Clear");
    setPageInfoState((prevState: any) => ({
      ...prevState, [inputFieldInFocus]: ""
    }));
  };
  const handleOnBlur = () => {
    if (!saved && inputFieldInFocus) {
      console.log("0000", inputRefs[inputFieldInFocus].value);
      console.log("1111", temp);

      setPageInfoState((prev: any) => ({
        ...prev, [inputFieldInFocus]: temp
      }));
      setInputFieldInFocus(null);
      dispatch(setInputElementInFocus(false))

    }

  };

  const savePageMeta = () => {
    setSaved(true);

    setInputFieldInFocus(null);

    if (saved) Object.values(inputRefs).forEach((el: any) => el.blur());

  };
  const setRef = (ref: any, property: string) => {
    inputRefs[property] = ref;
  };

  return (<div className="fixed z-50">

    <div className="relative z-50">
      <div className="fixed bottom-0 ">
        <BaseDrawer drawerName={DrawerEnums.PROFILE}>
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
                  <div className="p-5 profile-form">
                    <div
                      ref={ref => setRef(ref, "Images")}
                      className={`image-upload flex align-center place-content-between space-x-2 mb-4
                       h-24 ${inputFieldInFocus ? "hidden" : ""} `}>
                      <ProfileImage image={pageState.profileImage}
                                    onChange={onFileChange} />
                      <CoverImage image={pageState.coverImage}
                                  onChange={onFileChange} />
                    </div>
                    <InputComponent setRef={setRef}
                                    inputValue={pageInfoState?.title}
                                    name={"title"} handleOnBlur={handleOnBlur}
                                    handleFocus={handleFocus}
                                    handleChange={handleChange}
                                    inputFieldInFocus={inputFieldInFocus}
                                    clearInputField={clearInputField}
                                    submitHandler={savePageMeta}
                                    placeHolderText={"Title"}
                                    label={"Page title"}
                                    saved={saved}
                    />
                    <InputComponent setRef={setRef}
                                    inputValue={pageInfoState?.description}
                                    name={"description"}
                                    handleChange={handleChange}
                                    handleOnBlur={handleOnBlur}
                                    handleFocus={handleFocus}
                                    clearInputField={clearInputField}
                                    inputFieldInFocus={inputFieldInFocus}
                                    submitHandler={savePageMeta}
                                    placeHolderText={"Enter page description"}
                                    label={"Page description"}
                                    saved={saved}

                    />

                  </div>
                </div>
              </>)}
            </>

          </>
        </BaseDrawer>
      </div>
    </div>
  </div>);
};
