import React, { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   selectSections, setPageItemByIndex, TextArea
} from "../../../../redux/features/sections/sections.slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import {
  selectUiState
} from "../../../../redux/features/ui-state/ui-state.slice";


export const TextBoxEditor = () => {
  const dispatch = useDispatch();
  const sectionState = useSelector((selectSections));
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
    console.log(event)
    const value = event.target.value;
    setSaved(false);
    setTextAreaState( (prevState:any) =>( {...prevState,[activeInput]:value}))
  };


  const handleFocus = (inputInFocus: any) => {
    console.log(inputRefs, temp, "TEXTAREASTATE");
    setTemp(inputRefs[inputInFocus].value);
    setInputFieldInFocus(inputInFocus);
    console.log("TEMP", temp);
  };
  const handleOnBlur = (id: string) => {

    if (!saved && inputFieldInFocus) {
      console.log("0000", inputRefs[inputFieldInFocus].value);
      console.log("1111", temp);

      setTextAreaState((prev: any) => ({
        ...prev, [inputFieldInFocus]: temp
      }));

      setInputFieldInFocus(null);

    }

  };


  return (<div className={`w-screen mb-6 px-4 fadeInLeft text-box-editor `}>
    <div className={`my-4 ${inputFieldInFocus && inputFieldInFocus !== 'title' ? "hidden" : ""}`}
    >

      <label
        htmlFor="email"
        className="block text-sm font-semibold text-white-800"
      >
        Title
      </label>
      <div className="flex">

        <div
          className="input-container w-full flex place-items-center border-gray-500 border-solid shadow  ">
          <input
            ref={ref => setRef(ref, "title")}
            onChange={(event) => handleChange("title", event)}
            type="text"
            name="title"
            className="text-base text-zinc-900 text-gr border-0  w-full leading-tight text-white border-none py-3 px-3 w-
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
        ><FontAwesomeIcon icon={faCheck}
                          size={"2x"}
                          color={"#000"} />
        </button>
      </div>

    </div>

    <div className={`my-4 ${inputFieldInFocus && inputFieldInFocus !== 'content' ? "hidden" : ""}`} >
      <label
        htmlFor="password"
        className="block text-sm font-semibold text-white-800"
      >
        Description
      </label>
      <div className="flex ">

        <div
          className="text-area w-full flex place-items-center border-gray-500 border-solid shadow ">
             <textarea  rows={4}
                       ref={ref => setRef(ref, "content")}
                       name="content"
                       onChange={(event) => handleChange("content", event)}
                       className="text-base text-zinc-900 text-gr border-0  w-full leading-tight text-white border-none py-3 px-3 w-
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
        ><FontAwesomeIcon icon={faCheck}
                          size={"2x"}
                          color={"#000"} />
        </button>
      </div>

    </div>


  </div>);
};
//dispatch(addNewSectionItem(state));

export default TextBoxEditor;