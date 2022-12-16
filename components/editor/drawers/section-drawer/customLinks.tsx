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

export const CustomLinks: React.FC = () => {
  const [inputFieldInFocus, setInputFieldInFocus] = useState<any>(null);
  const customLinks = useSelector((selectCustomLinksInStore));
  const [customLinksState, setCustomLinksState] = useState<any>();
  const [saved, setSaved] = useState<boolean>(false);
  const inputRefs = useRef([]);
  const { inputInFocus } = useSelector(selectUiState);
  const dispatch = useDispatch();

  useEffect(() => {

    if (inputFieldInFocus !== null) dispatch(setInputElementInFocus(true))
    else dispatch(setInputElementInFocus(false))

  }, [inputFieldInFocus, inputInFocus]);

  return (<div
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
        />
      </div>)}
    <LinkEditor isDefault inputRefs={inputRefs}
                setInputFieldInFocus={setInputFieldInFocus}
                inputFieldInFocus={inputFieldInFocus}
                index={customLinks ? customLinks.links.length : 0}
                customLinksState={customLinksState}
                setSaved={setSaved}
                saved={saved}
                linkItem={DEFAULT_CUSTOM_LINK}
    />
  </div>);
};


type LinkEditorType = {
  inputFieldInFocus?: any, setInputFieldInFocus?: any, index: number, linkItem?: LinkItem, setSaved?: any, customLinksState: any, setCustomLinksState?: Function, isDefault?: boolean, inputRefs: any, saved?: boolean
};
const LinkEditor: React.FC<LinkEditorType> = ({
                                                linkItem,
                                                index,
                                                inputFieldInFocus,
                                                setInputFieldInFocus,
                                                isDefault,
                                                inputRefs
                                              }) => {


  const [temp, setTemp] = useState();
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

  }, []);

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
    className={`mb-4 fadeInLeft ${inputFieldInFocus !== null && (inputFieldInFocus != index) ? "hidden" : ""}`}>

    <div
      className="flex items-center rounded-md">
      <div
        className=" w-full  place-items-center rounded-md  "
        onBlur={handleOnBlur} onMouseLeave={handleMouseLeave}
      >

        <input
          ref={ref => setRef(ref, "description")}
          type="text"
          name="description"
          className="link-border border border-solid border-gray-600/20 rounded-tl-md rounded-tr-md text-base text-zinc-900  text-gr w-full leading-tight grey py-3 px-3 w-appearance-none"
          placeholder="Enter description"
          autoComplete="off"
          value={linkItemState?.description}
          onFocus={handleFocus}
          onChange={event => handleChange("description", event)}

        />
        <input
          ref={ref => setRef(ref, "url")}
          name="url"
          className="border border-t-0 border-solid border-gray-600/20 rounded-bl-md rounded-br-md  text-base text-zinc-900 text-gr w-full leading-tight grey  py-3 px-3 w-
                         appearance-none"
          value={linkItemState?.url}
          placeholder="Write a detailed url"
          autoComplete="off"
          onFocus={handleFocus}
          onChange={event => handleChange("url", event)}
        />
      </div>
      <button
        className={`text-sm flex place-items-center hover:cursor-pointer bg-transparent px-2 h-fit border-none ${!isNaN(inputFieldInFocus) && inputFieldInFocus === index ? "" : "hidden"}`}
        onMouseDown={(event) => {
          event.preventDefault();
          saveCustomLinksData();
        }}
      ><Icons.Save />
      </button>

    </div>

  </div>);

};



