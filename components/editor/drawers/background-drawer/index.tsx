import { useDispatch, useSelector } from "react-redux";
import { DrawerEnums } from "../../../../enums";
import backgroundColors from "../../background-colors";
import {
  selectPage, setBackground
} from "../../../../redux/features/editor/editor.slice";
import { BaseDrawer } from "../base-drawer";
import React, { SyntheticEvent, useState } from "react";
import { TabsListUnstyled, TabsUnstyled, TabUnstyled } from "@mui/base";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (<div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
  >
    {value === index && children}
  </div>);
}

export const BackgroundDrawer = () => {
  const dispatch = useDispatch();
  const { background } = useSelector(selectPage);
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent<Element, Event>, newValue: number) => {
    setValue(newValue);
  };
  return (<BaseDrawer drawerName={DrawerEnums.BACKGROUND}>

    <div className="h-[55vh] py-6">

      <TabsUnstyled onChange={handleChange} value={value} defaultValue={value}
      >
        <TabsListUnstyled>
          <TabUnstyled>  Colour</TabUnstyled>
          <TabUnstyled>Animated</TabUnstyled>
        </TabsListUnstyled>
      </TabsUnstyled>
      <TabPanel value={value} index={0}>
        <div className="colours-tab  px-4 pt-4">

          <div className="background-container grid">
            {backgroundColors.map((el, index) => {
              return (<div key={index}
                           className={` background-option__wrapper `}
                           onClick={() => dispatch(setBackground(el))}>
                <div
                  className={`${background?.id === el.id ? "outline-gray-500 outline-2 outline" : ""} border border-1 border-gray-400 background-option`}
                  style={{ background: el.hex }}>
                </div>
              </div>);
            })}
          </div>
        </div>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <div className="animated-bg-tab h-full w-full px-4 pt-4">

          <div className="animated-bg__container h-full w-fit  flex ">
            <div className="animated-bg__item">

            </div><div className="animated-bg__item">

            </div><div className="animated-bg__item">
            </div><div className="animated-bg__item">

            </div>
          </div>

        </div>
      </TabPanel>
    </div>

  </BaseDrawer>);
};

