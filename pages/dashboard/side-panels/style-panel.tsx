import { useEffect, useRef, useState } from "react";
import SlidingPanel from "react-sliding-side-panel";
import { BackgroundTabs } from "../background-tab";
import { useDashboardContextValue } from "../context/dashboard-context";
import { PanelHeader } from "../panel-header";
import { TemplatesTab } from "../templates-tab";

type StyleViewType = "" | "BACKGROUND" | "TEMPLATES";

const tabsData = [
  {
    label: "Background",
    content: <BackgroundTabs/>,
  },
  {
    label: "Template",
    content: <TemplatesTab/>,
  },
];
export const StylePanel = () => {
  const { setPanelState, panelState } = useDashboardContextValue();
  const [styleView, setStyleView] = useState<StyleViewType>("");

  const resetViews = () => {
    setStyleView("");
  };

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(50);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(50);

  const tabsRef = useRef<any[]>([]);

  useEffect(() => {

    // Todo: refactor this and remove needless code code
    function setTabPosition() {
      const currentTab: any = tabsRef.current[activeTabIndex]; //TOdo: type this properly
      console.log(currentTab?.offsetLeft, currentTab?.clientWidth);
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }

    setTabPosition();
    window.addEventListener("resize", setTabPosition);

    return () => window.removeEventListener("resize", setTabPosition);
  }, [activeTabIndex]);

  return (
    <SlidingPanel
      type={"right"}
      isOpen={panelState === "STYLE"}
      size={100}
      onClosed={resetViews}
    >
      <>
        <PanelHeader title={"EDIT"} />
        <div>
          <div className="relative">
            <div className="flex border-b style-tab__wrapper">
              {tabsData.map((tab, idx) => {
                return (
                  <div
                    key={idx}
                    ref={(el) => (tabsRef.current[idx] = el)}
                    className="pt-2 pb-3 text-center style-tab"
                    onClick={() => setActiveTabIndex(idx)}
                  >
                    {tab.label}
                  </div>
                );
              })}
            </div>
            <span
              className="absolute bottom-0 block h-px transition-all duration-200 bg-white"
              style={{ left: tabUnderlineLeft, width: '50%' }}
            />
          </div>
          <div className="py-4">
            <p>{tabsData[activeTabIndex].content}</p>
          </div>
        </div>
      </>
    </SlidingPanel>
  );
};
