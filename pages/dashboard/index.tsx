import { NextPage } from "next";
import Image from "next/image";
import cancelIcon from '../../assets/cancel.svg';
import arrowLeft from '../../assets/left-arrow.svg';
import bgIcon from '../../assets/theme.svg';
// import "../../styles/dashboard.scss";

import { useEffect, useState } from "react";
import SlidingPanel from 'react-sliding-side-panel';
import backgroundColors from "./background-colors";
import 'react-sliding-side-panel/src/index.css';
import { DashboardPanels } from "./panels";

type SecondPanelType = boolean;
type PanelType = 'PROFILE' | 'SECTIONS' | 'STYLE' | 'TEMPLATES' | '';

const Dashboard: NextPage = () => {


  const [openPanel, setOpenPanel] = useState<PanelType>('');

  return (
    <>
      <div className="dashboard">
        <div className="dashboard__actions">
          <div onClick={() => setOpenPanel('PROFILE')}>Profile</div>
          <div onClick={() => setOpenPanel('SECTIONS')}>Sections</div>
          <div onClick={() => {
            window.scrollTo(0, 1);
            setOpenPanel('STYLE')
          }}>Style</div>
          <div onClick={() => setOpenPanel('')}>Preview</div>
        </div>

        <DashboardPanels setOpenPanel={setOpenPanel} openPanel={openPanel} />

        {/* 
      <SlidingPanel
        type={'bottom'}
        isOpen={openPanel === "TEMPLATE"}
        size={30}
        backdropClicked={() => setOpenPanel('STYLE')}

      >
        <div className="template-content">
          TEMPLATE!!
        </div>
      </SlidingPanel> */}

      </div>

    </>
  );
};

export default Dashboard;
