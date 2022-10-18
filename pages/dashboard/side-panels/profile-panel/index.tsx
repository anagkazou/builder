import { SwipeableDrawer } from "@mui/material";
import React, {
  EventHandler, useCallback, useEffect, useRef, useState
} from "react";
import {
  PanelEnums, useDashboardContextValue
} from "../../context/dashboard-context";
import { PanelHeader } from "../../panel-header";
import { getCroppedImg, getRotatedImage } from "../../utils/canvas-utils";
import { useDispatch, useSelector } from "react-redux";
import {
  Page, PageMeta, selectpage, setPageCoverImage, setPageImage, setPageMeta
} from "../../../../redux/features/page-data/page-data.slice";
import { ProfileImage } from "./profile-image";
import { CoverImage } from "./cover-image";
import { ImageCropper } from "./image-cropper";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import InputComponent from "../../../../components/input.component";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PageInfo } from "next/dist/build/utils";
import {
  saveSocialLinks
} from "../../../../redux/features/sections/sections.slice";
import { log } from "util";

const ORIENTATION_TO_ANGLE: any = {
  "3": 180, "6": 90, "8": -90
};

export const enum ActiveUpload {
  PROFILE_IMAGE = "PROFILE-IMAGE", COVER_IMAGE = "COVER-IMAGE"
}

export const ProfilePanel = () => {
  const { panelState, setPanelState } = useDashboardContextValue();

  const [imageSrc, setImageSrc] = useState(null);
  const [activeUpload, setActiveUpload] = useState<string | null>(null);
  const [profileImageSrc, setProfileImageSrc] = useState(null);
  const [coverImageSrc, setCoverImageSrc] = useState(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<any>(0);
  const [zoom, setZoom] = useState<any>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [croppedImage, setCroppedImage] = useState<any>();

  const DEFAULT_VIEW_REF_STATE = {
    "Title": undefined, "Description": undefined, "Images": undefined
  };

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
  const pageState = useSelector(selectpage);
  const initialHeight = 60;
  const activeCropHeight = 100;
  const [panelHeight, setPanelHeight] = useState<number>(initialHeight);

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
  const pageInfo = useSelector(selectpage);


  const [temp, setTemp] = useState<Page>();
  //Todo: Explore using refs to store this value
  const [pageInfoState, setPageInfoState] = useState<typeof pageInfo.pageMeta>(pageInfo.pageMeta);
  const [saved, setSaved] = useState<boolean>(false);
  const isKeyboardOpen = useDetectKeyboardOpen();
  const inputRefs: any = {};

  useEffect(() => {
    console.log("INPUTINFOCUS CHANGES OHH", inputFieldInFocus);
  }, [inputFieldInFocus]);

  useEffect(() => {
    if (saved) {
      console.log("touched");
      dispatch(setPageMeta(pageInfoState));
      //inputRefs[inputFieldInFocus].blur();

    }
  }, [saved]);

  useEffect(() => {

    if (!isKeyboardOpen) { // @ts-ignore
      Object.values(inputRefs).forEach((el: any) => {
        console.log("EL", el);
        el?.blur();
      });
    }
    document.addEventListener("keydown", (event) => {
      console.log("User pressed: ", event.key);

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
    console.log("TEMP", inputRefs[inputInFocus]);
  };
  const handleChange = (event: any) => {
    setSaved(false);
    const value = event.target.value.replace(/\s/g, "");

    //TOdo: this is very wrong...
    setPageInfoState((prevState: any) => ({
      ...prevState, [inputFieldInFocus]: value
    }));
    console.log(value);
  };
  const clearInputField = (event: any) => {
    event.preventDefault();
    console.log(event, "touched!!!!! Clear");
    setPageInfoState((prevState: any) => ({
      ...prevState, [inputFieldInFocus]: ""
    }));
  };
  const handleOnBlur = (id: string) => {
    if (!saved && inputFieldInFocus) {
      console.log("0000", inputRefs[inputFieldInFocus].value);
      console.log("1111", temp);

      setPageInfoState((prev: any) => ({
        ...prev, [inputFieldInFocus]: temp
      }));
    }
    setInputFieldInFocus(null);

  };

  const savePageMeta = () => {
    setSaved(true);
    setInputFieldInFocus(null);
  };
  const setRef = (ref: any, property: string) => {
    inputRefs[property] = ref;
  };

  return (<div className="fixed z-50">

    <div className="relative z-50">
      <div className="fixed bottom-0 ">
        <SwipeableDrawer
          // panelClassName="dashboard-panel"
          anchor="bottom"
          open={panelState === PanelEnums.PROFILE}
          onClose={() => {
            setPanelState(PanelEnums.CLOSE);
            setTimeout(reset, 900);
          }}
          onAbort={reset}
          onOpen={() => setPanelState(PanelEnums.PROFILE)}
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
                                    label={"Page title"} />
                    <InputComponent setRef={setRef}
                                    inputValue={pageInfoState?.description}
                                    name={"description"}
                                    handleChange={handleChange}
                                    handleOnBlur={handleOnBlur}
                                    handleFocus={handleFocus}
                                    clearInputField={clearInputField}
                                    inputFieldInFocus={inputFieldInFocus}
                                    submitHandler={savePageMeta}
                                    placeHolderText={"Page description"}
                                    label={"Enter page description"} />

                    {/*<div className="flex items-center">*/}
                    {/*  <div*/}
                    {/*    className={`mb-4 w-full  ${inputFieldInFocus && inputFieldInFocus !== "description" ? "hidden" : ""}`}*/}
                    {/*  >*/}
                    {/*    <label className="block mb-2 text-sm "*/}
                    {/*           htmlFor="name">*/}
                    {/*      Bio Description*/}
                    {/*    </label>*/}
                    {/*    <div*/}
                    {/*      className="input-container flex place-items-center border-gray-500 border-solid shadow  ">*/}
                    {/*      <input*/}
                    {/*        autoComplete="off"*/}
                    {/*        className={`text-base text-zinc-900 text-gr border-0  w-full leading-tight text-white border-none py-3 px-3 w-*/}
                    {/*     appearance-none`}*/}
                    {/*        id="name"*/}
                    {/*        name="description"*/}
                    {/*        type="text"*/}
                    {/*        ref={ref => setRef(ref, "description")}*/}
                    {/*        value={pageInfoState?.description}*/}
                    {/*        placeholder="Enter Description"*/}
                    {/*        onFocus={() => handleFocus("description")}*/}
                    {/*        onBlur={() => handleOnBlur("description")}*/}
                    {/*        onChange={handleChange}*/}
                    {/*      />*/}
                    {/*      <button*/}
                    {/*        className={`border-0 bg-transparent ${inputFieldInFocus == "description" ? "block" : "hidden"}`}>*/}
                    {/*        <FontAwesomeIcon*/}
                    {/*          icon={faXmark} width={20} size={"2x"}*/}
                    {/*          color={"#000"} /></button>*/}
                    {/*    </div>*/}
                    {/*    <span>*/}

                    {/*</span>*/}
                    {/*  </div>*/}
                    {/*  <button*/}
                    {/*    className={`text-sm flex place-items-center bg-transparent px-2 h-fit border-none ${inputFieldInFocus == "description" ? "block" : "hidden"} `}*/}
                    {/*    onMouseDown={(event) => {*/}
                    {/*      event.preventDefault();*/}
                    {/*      savePageMeta();*/}
                    {/*    }}><FontAwesomeIcon icon={faCheck}*/}
                    {/*                        size={"2x"}*/}
                    {/*                        color={"#000"} />*/}
                    {/*  </button>*/}
                    {/*</div>*/}


                  </div>
                </div>
              </>)}
            </>

          </>
        </SwipeableDrawer>
      </div>
    </div>
  </div>);
};
