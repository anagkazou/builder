import React from "react";
import {
  selectUiState, setActiveDrawer, setActiveSectionView
} from "../../redux/features/ui-state/ui-state.slice";
import { DrawerEnums } from "../../enums";
import { useDispatch, useSelector } from "react-redux";
import { Icons } from "../../assets/icons";
import { Views } from "./drawers/section-drawer";

// const LeftDrawerNavAction = () => {
//   const { drawerState } = useSelector(selectUiState);
//
//   return (<>
//     {drawerState.activeDrawer === (DrawerEnums.SECTIONS || DrawerEnums.PROFILE || DrawerEnums.STYLE) &&
//       <div className="style-panel__header--icon"
//            onClick={() => dispatch(setActiveDrawer(DrawerEnums.CLOSE))}>
//
//         {<Icons.BottomChevron />}
//       </div>}
//   </>);
//
//
// };

// const RightDrawerNavAction = () => {
//   const { drawerState, sectionsView } = useSelector(selectUiState);
//
//   const { activeDrawer } = drawerState;
//   const { activeSectionView } = sectionsView;
//   return (<>
//     {activeDrawer === (DrawerEnums.SECTIONS || activeSectionView === Views.MAIN) &&
//       <div>
//         fff
//       </div>}
//
//     {activeSectionView === Views.SOCIALS && <div
//       className="style-panel__header--icon"
//       onClick={() => {
//       }}
//     ><Icons.OutlinePencil />
//     </div>}
//   </>);
//
//
// };


export const DrawerHeader = () => {
  const { drawerState, sectionsView } = useSelector(selectUiState);
  const { activeDrawer } = drawerState;
  const { activeSectionView } = sectionsView;
  const dispatch = useDispatch();

  return (<div className="style-panel__header px-5 w-screen">
    {(activeDrawer && activeSectionView === Views.MAIN) && (<>
      <div className="style-panel__header--icon"
           onClick={() => dispatch(setActiveDrawer(DrawerEnums.CLOSE))}>

        {<Icons.BottomChevron />}
      </div>
      <div
        className="style-panel__header--text font-medium text-xs"> {(activeSectionView !== Views.MAIN) ? activeSectionView : activeDrawer }</div>


      {!activeSectionView  ? <div
        className="style-panel__header--icon "
        onClick={() => {
        }}
      ><Icons.OutlinePencil />
      </div> : <div></div>}
    </>)}

    {(activeDrawer && activeSectionView !== Views.MAIN) && (<>
      <div className="style-panel__header--icon"
           onClick={() => dispatch(setActiveSectionView(Views.MAIN))}>

        {<Icons.LeftArrow width={20} height={20} />}
      </div>
      <div
        className="style-panel__header--text font-medium text-xs"> {activeSectionView}</div>


      {activeSectionView == Views.SOCIALS || activeSectionView == Views.LINKS ? <div
        className="style-panel__header--icon"
        onClick={() => {
        }}
      ><Icons.OutlinePencil />
      </div> : <div></div>}


    </>)}
  </div>);
};
