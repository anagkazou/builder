import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
import {
  collection, doc, getDoc, getDocs, query, where
} from "firebase/firestore";
import { db } from "../../firebase";
import {
  selectEditor, setActivePageInfo
} from "../../redux/features/editor/editor.slice";
import { useEffect } from "react";
import { EditorHeader } from "./editor-header";
import { EditorPreview } from "./editor-preview";
import { EditorDrawers } from "./drawers";
import { EditorActions } from "./editor-actions";


const Editor: NextPage = () => {
  const userState = useSelector(selectUser); //Todo: Type this properly
  const activePageId = useSelector(selectEditor)?.activePage?.pageId;
  const dispatch = useDispatch();


  const getPageInfo = async () => {
    // @ts-ignore
    if (userState && activePageId) {
      try {
        const pageRef = doc(db, "pages", activePageId);
        const docSnap = await getDoc(pageRef);

        dispatch(setActivePageInfo(docSnap.data()));
      } catch (error) {
        console.log("[ERROR GETTING PAGE INFO::::", error);
      }
    }
  };

  useEffect(() => {
    getPageInfo();
  },[]);

  return (<>
      <div className="flex items-center justify-center editor ">
        <EditorHeader/>
        <EditorPreview />
        <EditorDrawers />
        <EditorActions />
      </div>
    </>);
};

export default Editor;