import { Button } from "@mui/material";

//Check if the page has been published before and render 'publish' or 'update'
// as appropriate.

export const DashboardHeader = () => {

  return(

    <div className="dashboard-header top-0 flex fixed justify-end w-full px-4 py-2">
        <div className="">
          <Button variant="contained" style={{borderRadius:0}} >Publish</Button>
        </div>
    </div>
  )

}