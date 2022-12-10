import { useSelector } from "react-redux";
import { selectEditor } from "../../../redux/features/editor/editor.slice";
import React from "react";

export const EditorUrlView:React.FC = ()=> {
  const editorState = useSelector(selectEditor);

  return (
    <div className="editor-preview__url rounded-t-2xl bg-gray-200 flex place-items-center px-3 py-2 text-center border border-b-neutral-400">
          <div className="editor-preview__url--text bg-stone-50 rounded-xl w-full  text-xs leading-loose text-neutral-400"><span>https://anag.io/</span>{editorState.page.handle}</div>
    </div>
  )
}