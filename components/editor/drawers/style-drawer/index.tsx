import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setActiveDrawer
} from "../../../../redux/features/ui-state/ui-state.slice";
import { DrawerEnums } from "../../../../enums";
import { BaseDrawer } from "../base-drawer";
import { Icons } from "../../../../assets/icons";

export const StyleDrawer = () => {
  const dispatch = useDispatch();


  const [activeTabIndex] = useState(0);
  const [, setTabUnderlineWidth] = useState(50);
  const [, setTabUnderlineLeft] = useState(50);

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


  return (<BaseDrawer drawerName={DrawerEnums.STYLE}>
    <div>


      <div
        className="flex items-center justify-center h-[10rem] px-4 pt-4 pb-10">
        <div className="style-option flex flex-col bg-gray-200 rounded-md justify-center place-items-center  w-1/2 mr-2 p-2" onClick={() => {
          dispatch(setActiveDrawer(DrawerEnums.BACKGROUND));
        }}>
          <Icons.Template/>
          <div className="text-sm text-center">Background</div>
        </div>
        <div className="style-option w-1/2 p-2 flex flex-col bg-gray-200 rounded-md justify-center place-items-center" onClick={() => {
          dispatch(setActiveDrawer(DrawerEnums.TEMPLATES));
        }}>
          <Icons.Template/>
          <div className="text-sm text-center" >Templates</div>

        </div>
      </div>
    </div>
  </BaseDrawer>);
};
