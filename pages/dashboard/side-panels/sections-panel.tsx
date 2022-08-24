import React from "react"
import SlidingPanel from "react-sliding-side-panel"

type SectionPanelPropType = {
    openPanel: string,
    setOpenPanel: any
} 

export const SectionPanel: React.FC<SectionPanelPropType> = ({ openPanel, setOpenPanel }) => {


    return (
        <SlidingPanel
            type={'right'}
            isOpen={openPanel === "SECTIONS"}
            size={100}
            backdropClicked={() => setOpenPanel('')}
        >
           <div className="section-panel">
            Section COntent
            </div> 
        </SlidingPanel>

    )
}