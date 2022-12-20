import React, { useEffect, useRef, useState } from "react";
import { LinkItem } from "../../../../redux/features/sections/sections.slice";
import { DEFAULT_CUSTOM_LINK } from "../../../../app.consts";
import {
  saveCustomLinks, selectCustomLinksInStore
} from "../../../../redux/features/editor/editor.slice";
import { useDispatch, useSelector } from "react-redux";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import { Icons } from "../../../../assets/icons";
import {
  selectUiState, setInputElementInFocus
} from "../../../../redux/features/ui-state/ui-state.slice";
import { LinkThumbnail } from "./link-thumbnail";
import { ImageCropper } from "../profile-drawer/image-cropper";
import { getRotatedImage, readFile } from "../../utils/canvas-utils";
import { ActiveUpload } from "../profile-drawer";

export const CustomLinks: React.FC = () => {
  const [inputFieldInFocus, setInputFieldInFocus] = useState<any>(null);
  const customLinks = useSelector((selectCustomLinksInStore));
  const [customLinksState, setCustomLinksState] = useState<any>();
  const [saved, setSaved] = useState<boolean>(false);
  const inputRefs = useRef([]);
  const { inputInFocus } = useSelector(selectUiState);
  const dispatch = useDispatch();
  const [linkImageSrc, setLinkImageSrc] = useState(null);
  const [rotation, setRotation] = useState<any>(0);
  const [activeUpload, setActiveUpload] = useState<ActiveUpload | null>(null);
  const [imageIndex, setImageIndex] = useState()

  useEffect(() => {

    if (inputFieldInFocus !== null || activeUpload) dispatch(setInputElementInFocus(true)); else dispatch(setInputElementInFocus(false));

  }, [inputFieldInFocus, inputInFocus]);

  const reset = () => {
    setActiveUpload(null);
    setRotation(0);
    dispatch(setInputElementInFocus(false));
    setLinkImageSrc(null)
    // setTemp(pageInfo);
  };

  useEffect(() => {
    if (linkImageSrc !== null) dispatch(setInputElementInFocus(true));
  console.log("Activeupload", activeUpload)
  }, [activeUpload, linkImageSrc]);

  const onFileChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl: any = await readFile(file);

      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }


      if (e.target.name === ActiveUpload.LINK_IMAGE) {
        setActiveUpload(ActiveUpload.LINK_IMAGE);
        setLinkImageSrc(imageDataUrl);
      }
    }
  };

  return (<>
    {activeUpload ? <ImageCropper activeUpload={activeUpload}
                                  rotation={rotation}
                                  onChange={onFileChange}
                                  setRotation={setRotation}
                                  image={linkImageSrc}
                                  reset={reset}
                                  index={imageIndex}

    /> : (<div
      className={`section_links w-screen py-6 px-4 fadeInLeft ${!inputInFocus && "mb-6"}`}>
      {/*{JSON.stringify(customLinks)}*/}
      {customLinks?.links && customLinks.links.map((linkItem: LinkItem, index: number) =>
        <div key={index}
        >
          <LinkEditor
            inputFieldInFocus={inputFieldInFocus}
            setInputFieldInFocus={setInputFieldInFocus} key={index}
            setSaved={setSaved}
            linkItem={linkItem}
            setCustomLinksState={setCustomLinksState}
            index={index}
            customLinksState={customLinksState}
            inputRefs={inputRefs}
            setActiveUpload={setActiveUpload}
            onFileChange={onFileChange}
            setImageIndex={setImageIndex}
          />
        </div>)}
      <div className="flex w-full mb-4">
        <LinkEditor isDefault inputRefs={inputRefs}
                    setInputFieldInFocus={setInputFieldInFocus}
                    inputFieldInFocus={inputFieldInFocus}
                    index={customLinks ? customLinks.links.length : 0}
                    customLinksState={customLinksState}
                    setSaved={setSaved}
                    saved={saved}
                    linkItem={DEFAULT_CUSTOM_LINK}
                    setActiveUpload={setActiveUpload}
                    onFileChange={onFileChange}
                    setImageIndex={setImageIndex}
        />
      </div>
    </div>)

    }
  </>);
};


type LinkEditorType = {
  inputFieldInFocus?: any, setImageIndex:Function, onFileChange: any, setInputFieldInFocus?: any, index: number, linkItem?: LinkItem, setSaved?: any, customLinksState: any, setCustomLinksState?: Function, isDefault?: boolean, inputRefs: any, saved?: boolean, setActiveUpload: Function
};

const LinkEditor: React.FC<LinkEditorType> = ({
                                                linkItem,
                                                index,
                                                inputFieldInFocus,
                                                setInputFieldInFocus,
                                                isDefault,
                                                inputRefs,
                                                setActiveUpload,
                                                onFileChange, setImageIndex
                                              }) => {


  const [, setTemp] = useState();
  //Todo: Explore using refs to store this value
  //Todo: Fix thE typing for this state declaration
  const [linkItemState, setLinkItemState] = useState<LinkItem>();
  const [commited, setCommited] = useState<boolean>(false);
  const isKeyboardOpen = useDetectKeyboardOpen();
  const dispatch = useDispatch();


  useEffect(() => {

    if (!isKeyboardOpen) {
      handleMouseLeave();
      handleOnBlur();
      removeAllInputFromFocus();
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        saveCustomLinksData();
        removeAllInputFromFocus();
      }
    });

    return () => {
      // Todo: change saveCustonLinksData as appropriate
      document.removeEventListener("keydown", saveCustomLinksData);
    };
  }, [isKeyboardOpen]);

  useEffect(() => {
    if (!isDefault) {
      setLinkItemState(linkItem);
    } else {
      setLinkItemState(DEFAULT_CUSTOM_LINK);
    }

  }, [linkItem]);

  useEffect(() => {
    if (commited && linkItemState?.url?.length && linkItemState?.description?.length) {
      dispatch(saveCustomLinks({
        index: index, data: linkItemState
      }));
      removeAllInputFromFocus();
      //if (isDefault) setLinkItemState(DEFAULT_CUSTOM_LINK);

    }

  }, [commited]);


  const removeAllInputFromFocus = () => {
    inputRefs.current.forEach((el: any) => {
      Object.values(el).forEach((ref: any) => {
        ref && ref?.blur();
      });

    });
  };
  const saveCustomLinksData = () => {
    setCommited(true);
    setInputFieldInFocus(null);
    //if (commited) Object.values(inputRefs).forEach((el: any) => el.blur());
  };
  const setRef = (ref: any, property: string) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index][property] = ref;
    } else inputRefs.current[index] = {};

  };
  const handleChange = (activeInput: any, event: any) => {
    // event.preventDefault();
    const value = event.target.value;

    if (commited) setCommited(false);
    let newState = { ...linkItemState, [activeInput]: value };
    // Todo: set state with previous state without needing to create new state variable
    // @ts-ignore
    setLinkItemState(newState);

  };


  const handleFocus = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    // @ts-ignore
    setTemp(linkItemState);

    setInputFieldInFocus(index);
    dispatch(setInputElementInFocus(true));
  };

  const handleOnBlur = (event?: any) => {
    event?.preventDefault();
    event?.stopPropagation();
    // if (!commited) {
    //
    // }
    if (inputFieldInFocus != null) setInputFieldInFocus(null);

  };

  const handleMouseLeave = (event?: any) => {
    event?.preventDefault();

    setLinkItemState(linkItem);
    dispatch(setInputElementInFocus(false));
  };
  return (<div
    className={`w-full fadeInLeft mb-2 ${inputFieldInFocus !== null && (inputFieldInFocus != index) ? "hidden" : ""}`}>
    <div className="flex">
      <LinkThumbnail index={index} image={linkItemState?.image}
                     setActiveUpload={setActiveUpload}
                     onFileChange={onFileChange}
                      setImageIndex={setImageIndex}
      />

      <div
        className=" w-5/6 flex items-center rounded-md">
        <div
          className=" w-full  place-items-center rounded-md  "
          onBlur={handleOnBlur} onMouseLeave={handleMouseLeave}
        >

          <input
            ref={ref => setRef(ref, "description")}
            type="text"
            name="description"
            className="link-border border border-solid border-gray-600/20 rounded-tl-md rounded-tr-md text-xs text-zinc-900  text-gr w-full leading-tight grey py-2 px-2 w-appearance-none"
            placeholder="Link name"
            autoComplete="off"
            value={linkItemState?.description}
            onFocus={handleFocus}
            onChange={event => handleChange("description", event)}

          />
          <input
            ref={ref => setRef(ref, "url")}
            name="url"
            className="border border-t-0 border-solid border-gray-600/20 rounded-bl-md rounded-br-md  text-xs text-zinc-900 text-gr w-full leading-tight grey  py-2 px-2 w-
                         appearance-none"
            value={linkItemState?.url}
            placeholder="URL"
            autoComplete="off"
            onFocus={handleFocus}
            onChange={event => handleChange("url", event)}
          />
        </div>
        <button
          className={`text-xs flex place-items-center hover:cursor-pointer bg-transparent px-2 h-fit border-none ${!isNaN(inputFieldInFocus) && inputFieldInFocus === index ? "" : "hidden"}`}
          onMouseDown={(event) => {
            event.preventDefault();
            saveCustomLinksData();
          }}
        ><Icons.Save />
        </button>

      </div>

    </div>
  </div>);

};