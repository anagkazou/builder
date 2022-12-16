import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/index";
import {
  selectEditor, selectPage
} from "../../redux/features/editor/editor.slice";
import { useRouter } from "next/router";
import KeyboardBackspaceRoundedIcon
  from "@mui/icons-material/KeyboardBackspaceRounded";
//Check if the page has been published before and render 'publish' or 'update'
// as appropriate.

export const EditorHeader = () => {
  const activePageId = useSelector(selectEditor)?.activePage?.pageId;
  const sectionState = useSelector(selectPage);
  const router = useRouter();
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
      <div className=" flex justify-between w-full">
        <div className="flex items-center"
             onClick={() => router.push("/dashboard")}>
          <KeyboardBackspaceRoundedIcon color="primary"/></div>
        <Button variant="contained" color="primary"
                style={{ backgroundColor: "#000000" }}
                size="small"
                onClick={publishOrUpdatePage}>Publish</Button>
      </div>
    </div>);

};