import React, { useEffect, useState } from "react";
import { getRotatedImage, readFile } from "../../utils/canvas-utils";
import { useDispatch, useSelector } from "react-redux";
import {
  Editor, selectEditor, selectPage, setPageMeta
} from "../../../../redux/features/editor/editor.slice";

import { ProfileImage } from "./profile-image";
import { CoverImage } from "./cover-image";
import { ImageCropper } from "./image-cropper";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import InputComponent from "../../../input.component";
import {
  setInputElementInFocus
} from "../../../../redux/features/ui-state/ui-state.slice";
import { DrawerEnums } from "../../../../enums";
import { BaseDrawer } from "../base-drawer";


export const enum ActiveUpload {
  // eslint-disable-next-line no-unused-vars
  PROFILE_IMAGE = "PROFILE-IMAGE", COVER_IMAGE = "COVER-IMAGE", LINK_IMAGE= "LINK IMAGE"
}

export const ProfileDrawer = () => {
  const [, setImageSrc] = useState(null);
  const [activeUpload, setActiveUpload] = useState<string | null>(null);
  const [profileImageSrc, setProfileImageSrc] = useState(null);
  const [coverImageSrc, setCoverImageSrc] = useState(null);

  const [rotation, setRotation] = useState<any>(0);





  const dispatch = useDispatch();
  const pageState = useSelector(selectEditor).page;

  const onFileChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl: any = await readFile(file);

      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }

      if (e.target.name === ActiveUpload.COVER_IMAGE) {
        setActiveUpload(ActiveUpload.COVER_IMAGE);
        setCoverImageSrc(imageDataUrl);
      }
      if(e.target.name === ActiveUpload.PROFILE_IMAGE)  {
        setActiveUpload(ActiveUpload.PROFILE_IMAGE);
        setProfileImageSrc(imageDataUrl);
      }
      if(e.target.name === ActiveUpload.LINK_IMAGE)  {
        setActiveUpload(ActiveUpload.LINK_IMAGE);
        setProfileImageSrc(imageDataUrl);
      }
    }
  };


  // const saveImage = async (event: any) => {
  //   event.preventDefault();
  //   const img = activeUpload === ActiveUpload.PROFILE_IMAGE ? profileImageSrc : coverImageSrc;
  //   try {
  //     const croppedImage = await getCroppedImg(img, croppedAreaPixels, rotation);
  //     dispatch(activeUpload === ActiveUpload.PROFILE_IMAGE
  //       ? setPageImage(croppedImage) :
  //       setPageCoverImage(croppedImage));
  //     reset();
  //   } catch (e) {
  //     console.log(e);
  //   }
  //
  // };

  const reset = () => {
    setActiveUpload(null);
    setImageSrc(null);
    setProfileImageSrc(null);
    setCoverImageSrc(null);
    setRotation(0);
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

  useEffect(() => {
    if (saved) {
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
    dispatch(setInputElementInFocus(true));
  };

  const handleChange = (event: any) => {
    setSaved(false);
    const value = event.target.value;

    //TOdo: this is very wrong...
    setPageInfoState((prevState: any) => ({
      ...prevState, [inputFieldInFocus]: value
    }));
  };

  const clearInputField = () => {
    // event.preventDefault();
    setPageInfoState((prevState: any) => ({
      ...prevState, [inputFieldInFocus]: ""
    }));
  };
  const handleOnBlur = () => {
    if (!saved && inputFieldInFocus) {
      setPageInfoState((prev: any) => ({
        ...prev, [inputFieldInFocus]: temp
      }));
      setInputFieldInFocus(null);
      dispatch(setInputElementInFocus(false));

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
                <ImageCropper reset={reset}
                              image={activeUpload === ActiveUpload.PROFILE_IMAGE ? profileImageSrc : coverImageSrc}
                              activeUpload={activeUpload}
                              rotation={rotation}
                              onChange={onFileChange}
                              setRotation={setRotation}
                />) : (<>
                <div className="profile-panel py-6 ">
                  <div className="p-5 profile-form">
                    <label
                      className="block text-sm font-semibold text-white-800 mb-2 uppercase">Images</label>
                    <div
                      ref={ref => setRef(ref, "Images")}
                      className={`image-upload flex align-center place-content-between space-x-2 mb-4
                       h-20 ${inputFieldInFocus ? "hidden" : ""} `}>

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
                                    placeHolderText={"Your Name"}
                                    label={"Name"}
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
                                    placeHolderText={"Bio description"}
                                    label={"Enter description"}
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
