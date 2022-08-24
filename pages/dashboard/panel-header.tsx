import Image from "next/image";
import arrowLeft from '../../assets/left-arrow.svg';
import cancelIcon from '../../assets/cancel.svg';
import { useDashboardContextValue, PanelEnums } from "./context/dashboard-context";
type PanelHeaderType = {
    title: string,

}
export const PanelHeader: React.FC<PanelHeaderType> = ({ title }) => {

    const { setPanelState, panelState } = useDashboardContextValue()


    return (
        <div className="style-panel__header">
            <div className="style-panel__header--icon" >
            </div>
            <p className="style-panel__header--text">
                {title} </p>

            <div className="style-panel__header--icon" onClick={() =>{
                console.log('TOUCHEDD')
                setPanelState(PanelEnums.CLOSE)}}> <Image src={cancelIcon} /></div>

        </div>
    )

}