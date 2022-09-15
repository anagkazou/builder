import React, { useState } from "react";
import { addNewLinkItem, addNewSectionItem, LinkItem } from "../../../../redux/features/sections/sections.slice";
import { useDispatch } from "react-redux";
import { linkSync } from "fs";

type LinkEditor = {
  openPanel: string;
  setOpenPanel: any;
};
const LinkEditor: React.FC = () => {

  const dispatch = useDispatch();

  const [state, setState] = useState<LinkItem>({ description: "OOOO", url: "AAAAA" });
  return (
    <div className="link-editor">
      <form className="mt-6">
        <div className="mb-2">
          <input
            // onChange={}
            type="text"
            name="title"
            className="block p-2.5 w-full text-sm text-white-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Title"
          />
        </div>
        <div className="my-8">

          <input id="message"
                 name="description"
                 className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 placeholder="Write a detailed description"></input>

        </div>

        <div className="mt-6">
          <button
            onClick={(event) => {
              event.preventDefault();
              dispatch(addNewLinkItem(state));
            }}
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
            save
          </button>
        </div>
      </form>

    </div>
  );
};


export const Links: React.FC = (props) => {

  return (
    <div className="section_links w-screen px-4 fadeInLeft">
      <LinkEditor />

    </div>
  );
};

