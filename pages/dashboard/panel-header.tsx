import Image from "next/image";
import arrowLeft from "../../assets/left-arrow.svg";
import cancelIcon from "../../assets/cancel.svg";
import { useDashboardContextValue, PanelEnums } from "./context/dashboard-context";
import { Views } from "./side-panels/section-panels";

type PanelHeaderType = {
  title: string;
  setViewState?: any;
  viewState?: any;
};
export const PanelHeader: React.FC<PanelHeaderType> = ({ title, setViewState, viewState }) => {
  const { setPanelState, panelState } = useDashboardContextValue();

  return (
    <div className="style-panel__header px-5 w-screen">
      <div className="style-panel__header--icon" onClick={() => setViewState(Views.MAIN)}><Image alt={"cancel icon"}
                                                                                                 src={cancelIcon} />
      </div>
      <p className="style-panel__header--text">{title} </p>

      <div
        className="style-panel__header--icon"
        onClick={() => {
          setPanelState(PanelEnums.CLOSE);
        }}
      >
        <Image alt={"cancel icon"} src={cancelIcon} />
      </div>
    </div>
  );
};
