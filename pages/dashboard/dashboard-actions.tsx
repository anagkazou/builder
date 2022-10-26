import { useDashboardContextValue, DrawerEnums } from "./context/dashboard-context";
import { useDispatch } from "react-redux";
import { setActiveDrawer } from "../../redux/features/ui-state/ui-state.slice";

export const DashboardActions = () => {
  const dispatch = useDispatch();
  return (
    <div className="dashboard__actions">
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
