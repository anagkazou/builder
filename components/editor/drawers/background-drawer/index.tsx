import { SwipeableDrawer } from "@mui/material";
import {
  selectUiState, setActiveDrawer
} from "../../../../redux/features/ui-state/ui-state.slice";
import { useDispatch, useSelector } from "react-redux";
import { DrawerEnums } from "../../../../enums";
import { DrawerHeader } from "../../drawer-header";
import backgroundColors from "../../background-colors";
import {
  selectPage, setBackground
} from "../../../../redux/features/editor/editor.slice";

export const BackgroundDrawer = () => {
  const dispatch = useDispatch();
  const { drawerState } = useSelector(selectUiState);
  const { background } = useSelector(selectPage);

  return (<SwipeableDrawer
    anchor={"bottom"}
    open={drawerState.activeDrawer === DrawerEnums.BACKGROUND}
    onClose={() => {
      dispatch(setActiveDrawer(DrawerEnums.STYLE));
    }}
    onOpen={() => dispatch(setActiveDrawer(DrawerEnums.BACKGROUND))}
  >
    <>
      <DrawerHeader />
      <div className="background-tab h-[50vh] px-4 pt-4">

        <div className="background-container">
          {backgroundColors.map((el, index) => {
            return (<div key={index}
                         className={` background-option__wrapper `}
                          onClick={()=> dispatch(setBackground(el))}>
              <div className={`${background?.id === el.id ? "border-orange-50 border-4 border-solid" : ""} background-option`}
                   style={{ background: el.hex }}>
                {" "}
              </div>
            </div>);
          })}
        </div>
      </div>

    </>

  </SwipeableDrawer>);
};

