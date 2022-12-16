import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/index";
import {
  selectEditor, setActivePageInfo
} from "../../redux/features/editor/editor.slice";
import { useEffect } from "react";
import { EditorHeader } from "../../components/editor/editor-header";
import { EditorPreview } from "../../components/editor/editor-preview";
import { EditorDrawers } from "../../components/editor/drawers";
import { EditorNavbar } from "../../components/editor/editor-navbar";


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
      <div className="flex pt-16 justify-center editor ">
        <EditorHeader/>
        <EditorPreview />
        <EditorDrawers />
        <EditorNavbar />
      </div>
    </>);
};

export default Editor;