import { query, collection, where, getDocs } from "firebase/firestore";
import { NextPage } from "next";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import "react-sliding-side-panel/src/index.css";
import { db } from "../../firebase";
import { selectUser } from "../../redux/features/auth/authSlice";
import { DashboardActions } from "./dashboard-actions";
import { DashboardPreview } from "./dashboard-preview";
import { DashboardPanels } from "./panels";

const Dashboard: NextPage = () => {


  useEffect(() => {
    const userState = useSelector(selectUser);

    const userRef = query(collection(db, "user"), where("pageId", "==", ));
    const userSnap = await getDocs(userRef);

    

    return () => {
      second
    }
  }, [third])
  
  return (
    <>
      <div className="flex items-center justify-center dashboard">
        <DashboardPreview/>
        <DashboardPanels />
        <DashboardActions />
      </div>
    </>
  );
};

export default Dashboard;
