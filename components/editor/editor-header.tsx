import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  collection, doc, getDocs, query, updateDoc, where
} from "firebase/firestore";
import { db } from "../../firebase";
import { selectUser } from "../../redux/features/auth/authSlice";
import {
  selectEditor, selectPage
} from "../../redux/features/editor/editor.slice";

//Check if the page has been published before and render 'publish' or 'update'
// as appropriate.

export const EditorHeader = () => {
  const dispatch = useDispatch();
  const activePageId = useSelector(selectEditor)?.activePage?.pageId;
  const sectionState = useSelector(selectPage);

  const publishOrUpdatePage = async ()=>{


    // @ts-ignore
    const pageRef = doc(db, "pages", activePageId);
    try {
       await updateDoc(pageRef, { ...sectionState, published:true });
    }
   catch (error) {
     console.log("[ERROR PUBLISHING::::", error);
   }
  }

  return(

    <div className="dashboard-header top-0 flex fixed justify-end w-full px-4 py-2">
        <div className="">
          <Button variant="contained" style={{borderRadius:0}} onClick={publishOrUpdatePage} >Publish</Button>
        </div>
    </div>
  )

}