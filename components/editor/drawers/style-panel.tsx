import { useEffect, useRef, useState } from "react";
import SlidingPanel from "react-sliding-side-panel";
import { BackgroundTabs } from "../background-tab";
import { DrawerHeader } from "../drawer-header";
import { TemplatesTab } from "../templates-tab";
import { useDispatch, useSelector } from "react-redux";
import { selectUiState } from "../../../redux/features/ui-state/ui-state.slice";
import { DrawerEnums } from "../../../enums";

type StyleViewType = "" | "BACKGROUND" | "TEMPLATES";

const tabsData = [
  {
    label: "Background",
    content: <BackgroundTabs />,
  },
  {
    label: "Template",
    content: <TemplatesTab />,
  },
];
export const StylePanel = () => {
  const [styleView, setStyleView] = useState<StyleViewType>("");
  const activeDrawer = useSelector(selectUiState)?.drawerState?.activeDrawer;

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

  // NEW IMPLENTATION
  const [selectedTab, setSelectedTab] = useState("Tab 1");

  /**
   * TabChange handler,
   * updates state with the current selected tab value.
   *
   * api calls for updation of data,
   * if required, can be done here
   */
  const changeTab: (selectedTab: { label: string; key: string | number }) => void = (
    updatedTab
  ) => {
    setSelectedTab(updatedTab.label);
  };

  return (
    <SlidingPanel
      type={"right"}
      isOpen={activeDrawer === DrawerEnums.STYLE}
      size={100}
      onClosed={resetViews}
    >
      <>
        <DrawerHeader title={"EDIT"} />
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
              style={{ left: tabUnderlineLeft, width: "50%" }}
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
