import { useDashboardContextValue, PanelEnums } from "./context/dashboard-context";

export const DashboardActions = () => {
  const { setPanelState } = useDashboardContextValue();
  return (
    <div className="dashboard__actions">
      <div onClick={() => setPanelState(PanelEnums.PROFILE)}>Profile</div>
      <div onClick={() => setPanelState(PanelEnums.SECTIONS)}>Sections</div>
      <div
        onClick={() => {
          window.scrollTo(0, 1);
          setPanelState(PanelEnums.STYLE);
        }}
      >
        Style
      </div>
      <div onClick={() => setPanelState(PanelEnums.PREVIEW)}>Preview</div>
    </div>
  );
};
