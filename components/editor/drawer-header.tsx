import Image from "next/image";
import cancelIcon from "../../assets/cancel.svg";
import React from "react";
import { Views } from "./drawers/section-panels";

type PanelHeaderType = {
  title: string;
  setViewState?: any;
  viewState?: any;
};
export const DrawerHeader: React.FC<PanelHeaderType> = ({ title, setViewState, viewState }) => {

  return (
    <div className="style-panel__header px-5 w-screen">
      <div className="style-panel__header--icon" onClick={() => setViewState(Views.MAIN)}><Image alt={"cancel icon"}
                                                                                                 src={cancelIcon} />
      </div>
      <p className="style-panel__header--text">{title} </p>

      <div
        className="style-panel__header--icon"
        onClick={() => {
          setViewState("CLOSE");
        }}
      >
        <Image alt={"cancel icon"} src={cancelIcon} />
      </div>
    </div>
  );
};
