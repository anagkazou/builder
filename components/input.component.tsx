import React, { ChangeEventHandler } from "react";
import { Icons } from "../assets/icons";

type InputComponentProps = {
  // eslint-disable-next-line no-unused-vars
  saved?: boolean, refProp?: string, title?: string, label: string, handleOnBlur: Function, clearInputField: any, handleChange: ChangeEventHandler, name: string, submitHandler: Function, inputFieldInFocus?: string, setRef: Function, handleFocus: (refProp: string) => void, placeHolderText?: string, inputValue: any
}
export const InputComponent = ({
                                 setRef,
                                 name,
                                 submitHandler,
                                 inputFieldInFocus,
                                 handleFocus,
                                 handleOnBlur,
                                 inputValue,
                                 handleChange,
                                 placeHolderText,
                                 label
                               }: InputComponentProps) => {


  return (< div className="flex items-center ">
    <div
      className={`mb-6 w-full  ${inputFieldInFocus && inputFieldInFocus !== name ? "hidden" : ""}`}
    >
      <label
        className="block text-sm font-semibold text-white-800 mb-2 uppercase"
        htmlFor="name">
        {label && label}
      </label>
      <form onSubmit={(event) => {
        event.preventDefault();
        submitHandler();
      }}
            className=" flex place-items-center border-gray-500 border-solid   ">
        <input
          autoComplete="off"
          className={`input-container text-sm text-zinc-900 text-gr border-0  w-full leading-tight text-white border-none py-3 px-3 w-
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


        <button
          className={`text-sm flex place-items-center hover:cursor-pointer bg-transparent px-2 h-fit border-none ${inputFieldInFocus == name ? "block" : "hidden"}`}
          onMouseDown={(event) => {
            event.preventDefault();
            submitHandler();
          }}
        ><Icons.Save />
        </button>
      </form>
      <span>

                      </span>
    </div>
  </div>);
};

export default InputComponent;