import { width } from "@mui/system";
import React, { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SlidingPanel from "react-sliding-side-panel";
import { addNewSectionItem, selectSections } from "../../../../redux/features/sections/sections.slice";
import { PanelEnums, useDashboardContextValue } from "../../context/dashboard-context";
import { PanelHeader } from "../../panel-header";
import TextBoxEditor from "./text-box-editor";
import { number } from "prop-types";
export enum Views {
  MAIN = "MAIN",
  TEXT_BOX = "TEXT_BOX",
}
type SectionPanelPropType = {
  openPanel: string;
  setOpenPanel: any;
};

export const SectionPanel: React.FC<SectionPanelPropType> = ({
                                                               openPanel,
                                                               setOpenPanel
                                                             }) => {
  const { setPanelState, panelState } = useDashboardContextValue();
  const dispatch = useDispatch();
  const sectionState = useSelector((selectSections));
  const uid = useId();
  const [state, setState] = useState({
    type: "TEXTBOX",
    title: "",
    content: ""
  });
  const handleChange = (event: any) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };
  const [viewState, setViewState] = useState<Views>(Views.MAIN);

  useEffect(() => {
      if(viewState === Views.TEXT_BOX) setPanelHeight(55);
    if(viewState === Views.MAIN) setPanelHeight(70)

  }, [viewState]);

  const resetViews = ()=> {
    setViewState(Views.MAIN);
    setPanelHeight(70);
  }

  const [panelHeight, setPanelHeight] = useState<number>(70);
  useEffect(() => {
    console.log("IIIII::", state);
  }, [state]);
  return (
    <SlidingPanel
      type={"bottom"}
      isOpen={panelState === PanelEnums.SECTIONS}
      size={panelHeight}
      backdropClicked={() => setPanelState(PanelEnums.CLOSE)}
       onClosed={resetViews}
    >
      <div className="section-panel">
        <PanelHeader title={"Sections"} setViewState={setViewState} viewState={viewState} />

        {/*<div className="test-form">
          <input onChange={handleChange} name="title" type="text" />
          <textarea
            onChange={handleChange}
            name="content"
            id=""
            cols={30}
            rows={10}
          ></textarea>
          <button onClick={(event) => dispatch(addNewSectionItem(state))}>
            BUTTONNN
          </button>
        </div>*/}

        <div className="flex flex-row sections-body">
          {viewState == Views.MAIN && <div className="w-screen px-4 sections-body__main fadeInLeft">

            <h3> My sections</h3>
            <div className="my-sections">
              {
                sectionState.items.length ?
                  sectionState.items.map((el, i) => <div className="my-sections__section bg-slate-400 py-3"
                                                         key={i}> {el.type}</div>)
                  : <div className="my-sections__empty-state border-2 border-amber-500 p-3"
                  > Add new sections</div>
              }
            </div>

            <div className="more-sections__wrapper">
              <h3> Add More sections</h3>

              <div className="more-sections">

                <div role="button" className="more-sections__section bg-slate-400 py-3">
                  Socials
                </div>
                <div role="button" className="more-sections__section bg-slate-400 py-3" onClick={()=>setViewState(Views.TEXT_BOX)}>
                  Text Box
                </div>
                <div role="button" className="more-sections__section bg-slate-400 py-3">
                  Links
                </div>
              </div>
            </div>
          </div>
          }
          {viewState == Views.TEXT_BOX && <TextBoxEditor  />}

        </div>
      </div>

    </SlidingPanel>
  );
};
