import { SwipeableDrawer } from "@mui/material";
import {
  selectUiState, setActiveDrawer
} from "../../../../redux/features/ui-state/ui-state.slice";
import { useDispatch, useSelector } from "react-redux";
import { DrawerEnums } from "../../../../enums";
import { DrawerHeader } from "../../drawer-header";

export  const TemplatesDrawer = () => {
      const dispatch = useDispatch();
      const {drawerState} = useSelector(selectUiState);


  return(
    <SwipeableDrawer
      anchor={"bottom"}
    open={drawerState.activeDrawer === DrawerEnums.TEMPLATES}
    onClose={()=>{
      dispatch(setActiveDrawer(DrawerEnums.STYLE))
    }}
    onOpen={()=> dispatch(setActiveDrawer(DrawerEnums.TEMPLATES))}
    >
      <>
      <DrawerHeader />
      <div className="templates-body h-[50vh]">
        Templates body
      </div>
      </>

    </SwipeableDrawer>
  )
}

