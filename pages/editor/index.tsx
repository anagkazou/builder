import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import {
  setPageFromFirestore
} from "../../redux/features/page-data/page-data.slice";
import { useEffect } from "react";
import { DrawerHeader } from "./editor-header";
import { EditorPreview } from "./editor-preview";
import { EditorDrawers } from "./drawers";
import { EditorActions } from "./editor-actions";


const Editor: NextPage = () => {
  const userState: any = useSelector(selectUser); //Todo: Type this properly

  const dispatch = useDispatch();
  const getPageInfo = async () => {
    const handle = userState?.user?.handle ;
    console.log("HANDLEE", handle);

    if(userState.user && handle) {
      //console.log("TOUCHEDD", handle);

      const pageRef = query(collection(db, "pages"),
        where("handle", "==", handle));
      const pageSnap = await getDocs(pageRef);
      pageSnap.forEach((doc) => {
        console.log("TOUCHEDD", handle);
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        dispatch(setPageFromFirestore(doc.data()));
      });
    }
  };

  useEffect(() => {
    console.log("CALLEDDD");
    getPageInfo();
  }, );

  return (
    <>
      <div className="flex items-center justify-center editor ">
        <DrawerHeader/>
        <EditorPreview />
        <EditorDrawers />
        <EditorActions />
      </div>
    </>
  );
};

export default Editor;