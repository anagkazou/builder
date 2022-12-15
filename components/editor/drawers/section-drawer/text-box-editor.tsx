import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Todo: Move this type Alias to page slice
import { TextArea } from "../../../../redux/features/sections/sections.slice";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import {
  selectUiState, setInputElementInFocus
} from "../../../../redux/features/ui-state/ui-state.slice";
import {
  selectPage, setPageItemByIndex
} from "../../../../redux/features/editor/editor.slice";
import { Icons } from "../../../../assets/icons";


export const TextBoxEditor = () => {
  const dispatch = useDispatch();
  const sectionState = useSelector((selectPage));
  const {sectionsView} = useSelector(selectUiState)
  // const [state, setState] = useState({
  //   type: "TEXTBOX", title: "", content: ""
  // });
  const [temp, setTemp] = useState();
  //Todo: Explore using refs to store this value
  const [inputFieldInFocus, setInputFieldInFocus] = useState<any>(null);
  const [textAreaState, setTextAreaState] = useState<TextArea>();
  const [saved, setSaved] = useState<boolean>(false);
  const isKeyboardOpen = useDetectKeyboardOpen();
  const inputRefs: any = {};

  useEffect(() => {

    if (!isKeyboardOpen) {
      //setInputFieldInFocus(null)
      console.log('AAAAAAAA')
      Object.values(inputRefs).forEach((el: any) => {
        el.blur()
      });
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        saveTextAreaData();

      }
    });

    return () => {
      document.removeEventListener("keydown", saveTextAreaData);
    };
  }, [isKeyboardOpen]);

  useEffect(() => {
    let sectionItem;
    const { activeSectionIndex } = sectionsView;
    if(activeSectionIndex && activeSectionIndex == -1) {
       sectionItem = sectionState.items[sectionState.items.length - 1];
      // @ts-ignore
      setTextAreaState(sectionItem);

    }
    else if(activeSectionIndex && activeSectionIndex > 0){
      sectionItem = sectionState.items[activeSectionIndex];
        //  console.log(sectionItem.type, SectionEnums.TEXT_BOX)
        // @ts-ignore
        setTextAreaState(sectionItem);

    }

    console.log(textAreaState, "TEXTAREASTATE");
  }, []);

  useEffect(() => {
    if (saved) {
      console.log("touched");
      dispatch(setPageItemByIndex({
        data:textAreaState,
       index: sectionsView.activeSectionIndex
      }));
      Object.values(inputRefs).forEach((el:any)=> el.blur())

    }
  }, [saved]);


  const saveTextAreaData = () => {
    setSaved(true);
    setInputFieldInFocus(null);
    if(saved) Object.values(inputRefs).forEach((el:any)=> el.blur())
  };
  const setRef = (ref: any, property: string) => {
    inputRefs[property] = ref;
  };
  const handleChange = (activeInput: any, event:any) => {
    event.preventDefault();
    const value = event.target.value;
    setSaved(false);
    setTextAreaState( (prevState:any) =>( {...prevState,[activeInput]:value}))
  };


  const handleFocus = (inputInFocus: any) => {
    setTemp(inputRefs[inputInFocus].value);
    setInputFieldInFocus(inputInFocus);

    dispatch(setInputElementInFocus(true))
  };
  const handleOnBlur = (id: string) => {

    if (!saved && inputFieldInFocus) {

      setTextAreaState((prev: any) => ({
        ...prev, [inputFieldInFocus]: temp
      }));

      setInputFieldInFocus(null);
      dispatch(setInputElementInFocus(false))

    }

  };


  return (<div className={`w-screen  px-4 fadeInLeft text-box-editor `}>
    <div className={`my-6 ${inputFieldInFocus && inputFieldInFocus !== 'title' ? "hidden" : ""}`}
    >

      <label
        htmlFor="email"
        className="block text-sm font-semibold text-white-800 mb-2"
      >
        TITLE
      </label>
      <div className="flex items-center">

        <div
          className=" w-full flex place-items-center ">
          <input
            ref={ref => setRef(ref, "title")}
            onChange={(event) => handleChange("title", event)}
            type="text"
            name="title"
            className="input-container text-base text-zinc-900 text-gr border-0  w-full leading-tight text-white border-none py-3 px-3 w-
                         appearance-none"
            placeholder="Title"
            value={textAreaState?.title}
            onFocus={() => handleFocus("title")}
            onBlur={() => handleOnBlur('title')}

          />

        </div>
        <button
          className={`text-sm flex place-items-center hover:cursor-pointer bg-transparent px-2 h-fit border-none ${inputFieldInFocus && inputFieldInFocus == 'title' ? "" : "hidden"}`}
          onMouseDown={(event) => {
            event.preventDefault();
            // submitHandler();
            saveTextAreaData()
          }}
        > <Icons.Save/>
        </button>
      </div>

    </div>

    <div className={`my-6 ${inputFieldInFocus && inputFieldInFocus !== 'content' ? "hidden" : ""}`} >
      <label
        htmlFor="password"
        className="block text-sm font-semibold text-white-800 mb-2"
      >
        DESCRIPTION
      </label>
      <div className="flex items-center">

        <div
          className=" w-full flex place-items-center ">
             <textarea  rows={4}
                       ref={ref => setRef(ref, "content")}
                       name="content"
                       onChange={(event) => handleChange("content", event)}
                        className="input-container text-base text-zinc-900 text-gr border-0  w-full leading-tight text-white border-none py-3 px-3 w-
                         appearance-none"
                       value={textAreaState?.content}
                       placeholder="Write a detailed content"
                       onFocus={() => handleFocus("content")}
                       onBlur={() => handleOnBlur('content')}
             ></textarea>

        </div>
        <button
          className={`text-sm flex place-items-center hover:cursor-pointer bg-transparent px-2 h-fit border-none ${inputFieldInFocus && inputFieldInFocus == 'content' ? "" : "hidden"} `}
          onMouseDown={(event) => {
            event.preventDefault();
            // submitHandler();
            saveTextAreaData();
          }}
        ><Icons.Save/>
        </button>
      </div>

    </div>


  </div>);
};
//dispatch(addNewSectionItem(state));

export default TextBoxEditor;