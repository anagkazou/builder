import { NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";
import { selectpage } from "../../../redux/features/page-data/page-data.slice";
import {
  selectSections
} from "../../../redux/features/sections/sections.slice";

export const DashboardPreview: React.FC = () => {
  const pageState = useSelector(selectpage);
  const sectionState = useSelector((selectSections));

  return (<>
      <p className="text-black">{pageState?.handle}</p>

      <div className=" bg-slate-300 dashboard-preview text-black">
        <div className=" text-xs w-96 text-red-600 "
             style={{ width: "100px" }}>
          {/*{JSON.stringify(sectionState)}*/}
        </div>
      </div>
    </>

  );
};
