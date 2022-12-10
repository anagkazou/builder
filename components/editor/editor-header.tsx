import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/index";
import {
  selectEditor, selectPage
} from "../../redux/features/editor/editor.slice";

//Check if the page has been published before and render 'publish' or 'update'
// as appropriate.

export const EditorHeader = () => {
  const activePageId = useSelector(selectEditor)?.activePage?.pageId;
  const sectionState = useSelector(selectPage);

  const publishOrUpdatePage = async () => {


    // @ts-ignore
    const pageRef = doc(db, "pages", activePageId);
    try {
      await updateDoc(pageRef, { ...sectionState, published: true });
    } catch (error) {
      console.log("[ERROR PUBLISHING::::", error);
    }
  };

  return (

    <div
      className="dashboard-header top-0 flex fixed justify-end w-full px-4 py-2">
      <div className="">
        <Button variant="contained" color="primary"
                style={{ backgroundColor: "#000000" }}
                onClick={publishOrUpdatePage}>Publish</Button>
      </div>
    </div>);

};