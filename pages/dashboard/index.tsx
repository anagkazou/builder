import { NextPage } from "next";

import "react-sliding-side-panel/src/index.css";
import { DashboardActions } from "./dashboard-actions";
import { DashboardPanels } from "./panels";

const Dashboard: NextPage = () => {
  return (
    <>
      <div className="dashboard">
        <DashboardPanels />
        <DashboardActions />
      </div>
    </>
  );
};

export default Dashboard;
