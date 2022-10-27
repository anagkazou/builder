import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewTextAreaItem, DEFAULT_TEXT_AREA_PAYLOAD, selectSections
} from "../../../../redux/features/sections/sections.slice";
import {
  DrawerEnums, useDashboardContextValue
} from "../../context/dashboard-context";
import { PanelHeader } from "../../panel-header";
import TextBoxEditor from "./text-box-editor";
import { Links } from "./links";
import { SocialsView } from "./socials-view";
import { SwipeableDrawer } from "@mui/material";
import {
  selectUiState, setActiveDrawer, setActiveSectionIndex, setActiveSectionView
} from "../../../../redux/features/ui-state/ui-state.slice";

export enum Views {
  MAIN = "MAIN", TEXT_AREA = "TEXT_AREA", LINKS = "LINKS", SOCIALS = "SOCIALS"
}

type SectionPanelPropType = {
  openPanel: string; setOpenPanel: any;
};

export const SectionPanel: React.FC<SectionPanelPropType> = ({}) => {
  const sectionState = useSelector((selectSections));
  const dispatch = useDispatch()
  const [viewState, setViewState] = useState<Views>(Views.MAIN);
  const { sectionsView, drawerState } = useSelector(selectUiState)




  return (<SwipeableDrawer
      anchor={"bottom"}
      open={drawerState.activeDrawer === DrawerEnums.SECTIONS}
      onOpen={()=> null }
      onClose={() => {
       // setPanelState(DrawerEnums.CLOSE);
        dispatch(setActiveDrawer(null));
        setTimeout(()=> dispatch(setActiveSectionView(Views.MAIN)),800);
      }}
      onBackdropClick={()=> {
        dispatch(setActiveDrawer(Views.MAIN));
        setTimeout(()=> dispatch(setActiveSectionView(Views.MAIN)),800);      }}
    >
      <div className="section-panel  ">
        <PanelHeader title={"Sections"} setViewState={setViewState}
                     viewState={sectionsView.activeSectionView} />


        <div className="flex flex-row sections-body">
          {sectionsView.activeSectionView == Views.MAIN &&
            <div className="w-screen height-large px-4 sections-body__main fadeInLeft">

              <h3> My sections</h3>
              <div className="my-sections">
                {sectionState.items.length ? sectionState.items.map((el, i) =>
                  <div
                    className="my-sections__section bg-slate-400 py-3"
                    key={i}> {el.type}</div>) : <div
                  className="my-sections__empty-state border-2 border-amber-500 p-3"
                > Add new sections</div>}
              </div>

              <div className="more-sections__wrapper">
                <h3> Add More sections</h3>

                <div className="more-sections">

                  <div role="button"
                       className="more-sections__section bg-slate-400 py-3"
                       onClick={() =>dispatch(setActiveSectionView(Views.SOCIALS))
                       }>
                    Socials
                  </div>
                  <div role="button"
                       className="more-sections__section bg-slate-400 py-3"
                       onClick={() => {
                         dispatch(addNewTextAreaItem(DEFAULT_TEXT_AREA_PAYLOAD))
                         dispatch(setActiveSectionIndex(-1))
                      //   setViewState(Views.TEXT_AREA);
                         dispatch(setActiveSectionView(Views.TEXT_AREA))
                       }}>
                    Text Box
                  </div>
                  <div role="button"
                       className="more-sections__section bg-slate-400 py-3"
                       onClick={() => dispatch(setActiveSectionView(Views.LINKS))
                       }>

                    Links
                  </div>
                </div>
              </div>
            </div>}
          {sectionsView.activeSectionView == Views.TEXT_AREA && <TextBoxEditor />}
          {sectionsView.activeSectionView  == Views.LINKS && <Links />}
          {sectionsView.activeSectionView  == Views.SOCIALS && <SocialsView  />}
        </div>
      </div>

    </SwipeableDrawer>);
};
