import { useDispatch } from "react-redux";
import { setActiveDrawer } from "../../redux/features/ui-state/ui-state.slice";
import { DrawerEnums } from "../../enums";

export const EditorActions = () => {
  const dispatch = useDispatch();
  return (
    <div className="editor__actions fixed bottom-0 grid">
      <div onClick={() => dispatch(setActiveDrawer(DrawerEnums.PROFILE))}>Profile</div>
      <div onClick={() => dispatch(setActiveDrawer(DrawerEnums.SECTIONS))}>Sections</div>
      <div
        onClick={() => {
          window.scrollTo(0, 1);
          dispatch(setActiveDrawer(DrawerEnums.STYLE))
        }}
      >
        Style
      </div>
      <div onClick={() => dispatch(setActiveDrawer(DrawerEnums.PREVIEW))}>Preview</div>
    </div>
  );
};
