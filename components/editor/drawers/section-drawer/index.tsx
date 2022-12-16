import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { DEFAULT_TEXT_AREA_PAYLOAD } from "../../../../app.consts";
import {
  addNewTextAreaItem, selectPage
} from "../../../../redux/features/editor/editor.slice";
import TextBoxEditor from "./text-box-editor";
import { CustomLinks } from "./customLinks";
import { SocialsView } from "./socials-view";
import {
  selectUiState, setActiveSectionIndex, setActiveSectionView
} from "../../../../redux/features/ui-state/ui-state.slice";
import { BaseDrawer } from "../base-drawer";
import { DrawerEnums } from "../../../../enums";

export enum Views {
  // eslint-disable-next-line no-unused-vars
  MAIN = "MAIN", TEXT_AREA = "TEXT_AREA", LINKS = "LINKS", SOCIALS = "SOCIALS"
}

type SectionPanelPropType = {
  openPanel: string; setOpenPanel: any;
};

export const SectionDrawer: React.FC<SectionPanelPropType> = ({}) => {
  const sectionState = useSelector((selectPage));
  const dispatch = useDispatch();
  const { sectionsView } = useSelector(selectUiState);


  return (<BaseDrawer drawerName={DrawerEnums.SECTIONS}>


    <div className="flex flex-row sections-body">
      {sectionsView.activeSectionView == Views.MAIN && <div
        className="w-screen height-large px-4 sections-body__main fadeInLeft">

        <h3> My sections</h3>
        <div className="my-sections">
          {sectionState.items.length ? sectionState.items.map((el, i) => <div
            className="my-sections__section bg-slate-400 py-3"
            onClick={() => {
              dispatch(setActiveSectionIndex(i));
              dispatch(setActiveSectionView(el.type));

              console.log(el);
            }}
            key={i}> {el.type}</div>) : <div
            className="my-sections__empty-state border-2 border-amber-500 p-3"
          > Add new sections</div>}
        </div>

        <div className="more-sections__wrapper">
          <h3> Add More sections</h3>

          <div className="more-sections">

            <div role="button"
                 className="more-sections__section bg-slate-400 py-3"
                 onClick={() => dispatch(setActiveSectionView(Views.SOCIALS))}>
              Socials
            </div>
            <div role="button"
                 className="more-sections__section bg-slate-400 py-3"
                 onClick={() => {
                   dispatch(addNewTextAreaItem(DEFAULT_TEXT_AREA_PAYLOAD));
                   dispatch(setActiveSectionIndex(-1));
                   //   setViewState(Views.TEXT_AREA);
                   dispatch(setActiveSectionView(Views.TEXT_AREA));
                 }}>
              Text Box
            </div>
            <div role="button"
                 className="more-sections__section bg-slate-400 py-3"
                 onClick={() => dispatch(setActiveSectionView(Views.LINKS))}>

              Links
            </div>
          </div>
        </div>
      </div>}
      {sectionsView.activeSectionView == Views.TEXT_AREA && <TextBoxEditor />}
      {sectionsView.activeSectionView == Views.LINKS && <CustomLinks />}
      {sectionsView.activeSectionView == Views.SOCIALS && <SocialsView />}
    </div>

  </BaseDrawer>);
};
