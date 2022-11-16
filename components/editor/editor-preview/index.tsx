import React from "react";
import { useSelector } from "react-redux";
import { selectEditor } from "../../../redux/features/editor/editor.slice";


export const EditorPreview: React.FC = () => {
  const editorState = useSelector(selectEditor);

  return (<div className="flex flex-col">

      <p className="text-white">{editorState.page.handle}</p>

      <div className=" bg-slate-300 editor-preview text-black">
        <div className=" text-xs w-96 text-red-600 "
             style={{ width: "100px" }}>
        </div>
      </div>
    </div>

  );
};
