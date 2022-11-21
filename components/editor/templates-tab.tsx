import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUiState, setActiveDrawer
} from "../../redux/features/ui-state/ui-state.slice";
import { DrawerEnums } from "../../enums";


export const TemplatesTab = () => {
  const {drawerState} = useSelector(selectUiState);
  const dispatch = useDispatch();

  return (
    <div className="templates-tab py-4 ">
    <p className="pb-10">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias accusamus eius
      natus officiis blanditiis minima, necessitatibus optio sunt incidunt, fugiat
      aspernatur non dolorum esse molestiae consectetur, eaque vel. Cupiditate, doloribus.
    </p>
    <Button variant="contained" onClick={()=>dispatch(setActiveDrawer(DrawerEnums.PROFILE))}> Test</Button>
    </div>
  );
};
