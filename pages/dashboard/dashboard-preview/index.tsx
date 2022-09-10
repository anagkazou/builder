import { NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";
import { selectpage } from "../../../redux/features/page-data/page-data.slice";

export const DashboardPreview: React.FC = () => {

    const pageState = useSelector(selectpage)

  return <div className=" bg-slate-300 dashboard-preview">
    <p className="text-black">
      {
            pageState?.status
        }  
    </p>
        
  </div>;
};
