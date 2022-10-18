import React, { ChangeEventHandler, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

type InputComponentProps = {
  refProp?: string, title?: string,label:string, handleOnBlur: Function, clearInputField: any, handleChange: ChangeEventHandler, name: string, submitHandler: Function, inputFieldInFocus?: string, setRef: Function, handleFocus: (refProp: string) => void, placeHolderText?: string, inputValue: any
}
export const InputComponent = ({
                                 refProp,
                                 title,
                                 setRef,
                                 name,
                                 submitHandler,
                                 inputFieldInFocus,
                                 handleFocus,
                                 handleOnBlur,
                                 inputValue,
                                 handleChange,
                                 clearInputField,
                                 placeHolderText,label
                               }: InputComponentProps) => {

  useEffect(() => {
    console.log("INPUTCOMP",inputValue);
  }, []);
  return (< div className="flex items-center ">
    <div
      className={`mb-4 w-full  ${inputFieldInFocus && inputFieldInFocus !== name ? "hidden" : ""}`}
    >
      <label className="block mb-2 text-sm "
             htmlFor="name">
        {label&&label}
      </label>
      <form onSubmit={(event) => {
        event.preventDefault();
        submitHandler();
      }}
            className="input-container flex place-items-center border-gray-500 border-solid shadow  ">
        <input
          autoComplete="off"
          className={`text-base text-zinc-900 text-gr border-0  w-full leading-tight text-white border-none py-3 px-3 w-
                         appearance-none`}
          id="name"
          name={inputValue}
          ref={ref => setRef(ref, name)}
          type="text"
          placeholder={placeHolderText && placeHolderText}
          value={inputValue}
          onFocus={() => handleFocus(name)}
          onBlur={() => handleOnBlur(name)}
          onChange={handleChange}
        />
        <button onMouseDown={event=> clearInputField(event)}
                className={`border-0 bg-transparent  ${inputFieldInFocus == name ? "block" : "hidden"}`}>
          <FontAwesomeIcon
            icon={faXmark} width={20} size={"2x"}
            color={"#000"} /></button>
      </form>
      <span>

                      </span>
    </div>
    <button
      className={`text-sm flex place-items-center hover:cursor-pointer bg-transparent px-2 h-fit border-none ${inputFieldInFocus == name ? "block" : "hidden"}`}
      onMouseDown={(event) => {
        event.preventDefault();
        submitHandler();
      }}
    ><FontAwesomeIcon icon={faCheck}
                      size={"2x"}
                      color={"#000"} />
    </button>
  </div>);
};

export default InputComponent;