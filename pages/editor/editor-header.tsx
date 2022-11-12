import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectSections } from "../../redux/features/sections/sections.slice";
import {
  collection,
  getDocs,
  query, updateDoc,
  where
} from "firebase/firestore";
import { db } from "../../firebase";
import { selectUser } from "../../redux/features/auth/authSlice";

//Check if the page has been published before and render 'publish' or 'update'
// as appropriate.

export const DrawerHeader = () => {
  const dispatch = useDispatch();
  const userState = useSelector(selectUser);
  const sectionState = useSelector(selectSections);
  const handle = userState.handle;
  const publishOrUpdatePage = async ()=>{
    const pageQuery = await query(collection(db, "pages"), where("handle", "==", handle));
    const pageDocs = await getDocs(pageQuery);
    console.log(pageDocs);
    try {
    await  pageDocs.forEach( (pageDoc) => {
         updateDoc(pageDoc.ref, { ...sectionState,published:true });
      });
    }
   catch (e) {
     console.log(e);
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