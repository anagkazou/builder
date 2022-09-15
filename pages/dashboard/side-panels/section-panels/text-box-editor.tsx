import React, { useEffect, useId, useState } from "react";
import { Views } from "./index";
import { useDashboardContextValue } from "../../context/dashboard-context";
import { useDispatch, useSelector } from "react-redux";
import { addNewSectionItem, selectSections } from "../../../../redux/features/sections/sections.slice";

export const TextBoxEditor = () => {
  const { setPanelState, panelState } = useDashboardContextValue();
  const dispatch = useDispatch();
  const sectionState = useSelector((selectSections));
  const uid = useId();
  const [state, setState] = useState({
    type: "TEXTBOX",
    title: "",
    content: ""
  });
  const handleChange = (event: any) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div className="w-screen px-4 fadeInLeft text-box-editor">
      <form className="mt-6">
        <div className="mb-2">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-white-800"
          >
            Title
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="title"
            className="block p-2.5 w-full text-sm text-white-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Title"
          />
        </div>
        <div className="my-8">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-white-800"
          >
            Description
          </label>
          <textarea id="message" rows={4}
                    name="description"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write a detailed description"></textarea>

        </div>

        <div className="mt-6">
          <button
            onClick={(event) => {
              event.preventDefault();
              dispatch(addNewSectionItem(state));
            }}
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
            Login
          </button>
        </div>
      </form>

    </div>
  );
};

export default TextBoxEditor;