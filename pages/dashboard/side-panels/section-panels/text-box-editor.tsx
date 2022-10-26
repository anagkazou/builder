import React, { useEffect, useId, useState } from "react";
import { useDashboardContextValue } from "../../context/dashboard-context";
import { useDispatch, useSelector } from "react-redux";
import {
   Links, SectionEnums, selectSections, TextArea
} from "../../../../redux/features/sections/sections.slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Page } from "../../../../redux/features/page-data/page-data.slice";
import useDetectKeyboardOpen from "use-detect-keyboard-open";

export const TextBoxEditor = () => {
  const dispatch = useDispatch();
  const sectionState = useSelector((selectSections));

  // const [state, setState] = useState({
  //   type: "TEXTBOX", title: "", content: ""
  // });
  const [temp, setTemp] = useState<Page>();
  //Todo: Explore using refs to store this value
  const [inputFieldInFocus, setInputFieldInFocus] = useState<any>(null);
  //Todo: fix the typing here.. llinks shouldnt need to be here but it errors out without it
  const [textAreaState, setTextAreaState] = useState<TextArea | Links>();
  const [saved, setSaved] = useState<boolean>(false);
  const isKeyboardOpen = useDetectKeyboardOpen();
  const inputRefs: any = {};


  useEffect(() => {
    const lastSectionItem = sectionState.items[sectionState.items.length - 1];

    if (lastSectionItem.type == SectionEnums.TEXT_BOX) {
      //  console.log(lastSectionItem.type, SectionEnums.TEXT_BOX)
      setTextAreaState(lastSectionItem);
    }

    console.log(textAreaState, "TEXTAREASTATE");
  }, []);

  const setRef = (ref: any, property: string) => {
    inputRefs[property] = ref;
  };
  const handleChange = (event: any) => {
    // setTextAreaState({
    //   ...textAreaState, [event.target.name]: event.target.value
    // });
  };


  const handleFocus = (inputInFocus: any) => {
    console.log(textAreaState, "TEXTAREASTATE");
    setTemp(inputRefs[inputInFocus].value);
    setInputFieldInFocus(inputInFocus);
    console.log("TEMP", temp);
  };

  return (<div className={`w-screen px-4 fadeInLeft text-box-editor `}>
    <div className={`my-4 ${inputFieldInFocus && inputFieldInFocus !== 'title' ? "hidden" : ""}`} ref={ref => setRef(ref, "title")}
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
            onChange={() => handleChange("title")}
            type="text"
            name="title"
            className="text-base text-zinc-900 text-gr border-0  w-full leading-tight text-white border-none py-3 px-3 w-
                         appearance-none"
            placeholder="Title"
            onFocus={() => handleFocus("title")}
          />

        </div>
        <button
          className={`text-sm flex place-items-center hover:cursor-pointer bg-transparent px-2 h-fit border-none `}
          onMouseDown={(event) => {
            event.preventDefault();
            // submitHandler();
          }}
        ><FontAwesomeIcon icon={faCheck}
                          size={"2x"}
                          color={"#000"} />
        </button>
      </div>

    </div>

    <div className={`my-4 ${inputFieldInFocus && inputFieldInFocus !== 'description' ? "hidden" : ""}`} ref={ref => setRef(ref, "description")}>
      <label
        htmlFor="password"
        className="block text-sm font-semibold text-white-800"
      >
        Description
      </label>
      <div className="flex ">

        <div
          className="text-area w-full flex place-items-center border-gray-500 border-solid shadow ">
             <textarea id="message" rows={4}
                       name="description"
                       onChange={() => handleChange("description")}
                       className="text-base text-zinc-900 text-gr border-0  w-full leading-tight text-white border-none py-3 px-3 w-
                         appearance-none"
                       placeholder="Write a detailed description"
                       onFocus={() => handleFocus("description")}

             ></textarea>

        </div>
        <button
          className={`text-sm flex place-items-center hover:cursor-pointer bg-transparent px-2 h-fit border-none `}
          onMouseDown={(event) => {
            event.preventDefault();
            // submitHandler();
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