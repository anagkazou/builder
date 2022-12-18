import { DrawerEnums } from "../../../../enums";
import { BaseDrawer } from "../base-drawer";
import React from "react";

export const TemplatesDrawer = () => {

  return (<BaseDrawer drawerName={DrawerEnums.TEMPLATES}
    >
        <div className="templates-body h-[55vh] overflow-x-scroll w-full pt-6">
          <div className="animated-bg-tab h-full w-full px-4 pt-4">

            <div className="animated-bg__container h-full w-fit  flex ">
              <div className="animated-bg__item">

              </div>
              <div className="animated-bg__item">

              </div>
              <div className="animated-bg__item">
              </div>
              <div className="animated-bg__item">

              </div>
            </div>

          </div>
        </div>


    </BaseDrawer>);
};

