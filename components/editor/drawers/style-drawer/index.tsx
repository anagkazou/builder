import { useEffect, useRef, useState } from "react";
import SlidingPanel from "react-sliding-side-panel";
import { BackgroundTabs } from "../../background-tab";
import { DrawerHeader } from "../../drawer-header";
import { TemplatesTab } from "../../templates-tab";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUiState, setActiveDrawer
} from "../../../../redux/features/ui-state/ui-state.slice";
import { DrawerEnums } from "../../../../enums";
import { SwipeableDrawer } from "@mui/material";

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

export const StyleDrawer = () => {
  const [styleView, setStyleView] = useState<StyleViewType>("");
  const activeDrawer = useSelector(selectUiState)?.drawerState?.activeDrawer;
  const dispatch = useDispatch();
  const {drawerState} = useSelector(selectUiState);

  const resetViews = () => {
    setStyleView("");
  };

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(50);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(50);

  const tabsRef = useRef<any[]>([]);

  useEffect(() => {
    // Todo: refactor this and remove needless code
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

  const [selectedTab, setSelectedTab] = useState("Tab 1");


  const changeTab: (selectedTab: { label: string; key: string | number }) => void = (
    updatedTab
  ) => {
    setSelectedTab(updatedTab.label);
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={drawerState.activeDrawer === DrawerEnums.STYLE || drawerState.activeDrawer === DrawerEnums.TEMPLATES || drawerState.activeDrawer === DrawerEnums.BACKGROUND}
      onClose={() => {
        dispatch(setActiveDrawer(null));
      }}
      onBackdropClick={()=> {
        dispatch(setActiveDrawer(null));
      }}
      onOpen={() => dispatch(setActiveDrawer(DrawerEnums.STYLE)) }
    >
      <>
        <DrawerHeader />
        {/*<div>*/}
        {/*  <div className="relative">*/}
        {/*    <div className="flex border-b style-tab__wrapper">*/}
        {/*      {tabsData.map((tab, idx) => {*/}
        {/*        return (*/}
        {/*          <div*/}
        {/*            key={idx}*/}
        {/*            ref={(el) => (tabsRef.current[idx] = el)}*/}
        {/*            className="pt-2 pb-3 text-center style-tab"*/}
        {/*            onClick={() => setActiveTabIndex(idx)}*/}
        {/*          >*/}
        {/*            {tab.label}*/}
        {/*          </div>*/}
        {/*        );*/}
        {/*      })}*/}
        {/*    </div>*/}
        {/*    <span*/}
        {/*      className="absolute bottom-0 block h-px transition-all duration-200 bg-white"*/}
        {/*      style={{ left: tabUnderlineLeft, width: "50%" }}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*  <div className="py-4">*/}
        {/*    <p>{tabsData[activeTabIndex].content}</p>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className="flex h-[10rem] px-4 pt-4 pb-10">
          <div className="style-option w-1/2 mr-2 p-2 bg-black" onClick={() => {
            dispatch(setActiveDrawer(DrawerEnums.BACKGROUND))}} >
            BACKGROUND
          </div>
          <div className="style-option w-1/2 p-2 bg-black" onClick={() => {
            dispatch(setActiveDrawer(DrawerEnums.TEMPLATES))}}>
            TEMPLATES
          </div>
        </div>
      </>
    </SwipeableDrawer>
  );
};
