import { useDispatch } from "react-redux";
import {
  setActiveDrawer
} from "../../../redux/features/ui-state/ui-state.slice";
import { DrawerEnums } from "../../../enums";
import { Icons } from "../../../assets/icons";
import "./editor-navbar.module.css";

export const EditorNavbar = () => {
  const dispatch = useDispatch();
  return (<div
    className="fixed bottom-0 flex w-full items-baseline justify-between bg-white px-12 py-4 editor__navbar">
    <div className="flex flex-col items-center editor-navbar__item"
         onClick={() => dispatch(setActiveDrawer(DrawerEnums.PROFILE))}>
      <div className="mb-0.5"><Icons.navProfile width={24} height={24} /></div>
      <div
        className="editor-navbar__item--text font-medium text-xs  text-dark">Profile
      </div>
    </div>
    <div className="flex flex-col items-center editor-navbar__item"
         onClick={() => dispatch(setActiveDrawer(DrawerEnums.SECTIONS))}>
      <div className="mb-0.5"><Icons.navSections width={24} height={24} /></div>
      <div
        className="editor-navbar__item--text font-medium text-xs  text-dark">Sections
      </div>
    </div>
    <div
      className="flex flex-col items-center editor-navbar__item"
      onClick={() => {
        window.scrollTo(0, 1);
        dispatch(setActiveDrawer(DrawerEnums.STYLE));
      }}
    >
      <div className="mb-0.5"><Icons.navStyle width={24} height={24} /></div>
      <div
        className="editor-navbar__item--text font-medium text-xs  text-dark">Style
      </div>

    </div>
    <div className="flex flex-col items-center editor-navbar__item"
         onClick={() => dispatch(setActiveDrawer(DrawerEnums.PREVIEW))}>
      <div className="mb-0.5"><Icons.navPreview width={24} height={24} /></div>

      <div
        className="editor-navbar__item--text font-medium text-xs  text-dark">Preview
      </div>
    </div>
  </div>);
};