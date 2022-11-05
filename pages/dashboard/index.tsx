import { query, collection, where, getDocs } from "firebase/firestore";
import { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "react-sliding-side-panel/src/index.css";
import { db } from "../../firebase";
import { selectUser } from "../../redux/features/auth/authSlice";
import { setPageFromFirestore } from "../../redux/features/page-data/page-data.slice";
import { DashboardActions } from "./dashboard-actions";
import { DashboardPreview } from "./dashboard-preview";
import { DashboardPanels } from "./panels";
import { DashboardHeader } from "./dashboard-header";

const Dashboard: NextPage = () => {
  const userState: any = useSelector(selectUser); //Todo: Type this properly

  const dispatch = useDispatch();
  const getPageInfo = async () => {
    const pageRef = query(
      collection(db, "pages"),
      where("handle", "==", userState.handle)
    );
    const pageSnap = await getDocs(pageRef);
    pageSnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      dispatch(setPageFromFirestore(doc.data()));
    });
  };

  useEffect(() => {
    getPageInfo();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center dashboard ">
        <DashboardHeader/>
        <DashboardPreview />
        <DashboardPanels />
        <DashboardActions />
      </div>
    </>
  );
};

export default Dashboard;
