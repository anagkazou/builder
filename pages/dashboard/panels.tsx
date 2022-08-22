import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import SlidingPanel, { PanelType } from "react-sliding-side-panel"
import backgroundColors from "./background-colors"
import Image from "next/image";
import cancelIcon from '../../assets/cancel.svg';
import arrowLeft from '../../assets/left-arrow.svg';
import bgIcon from '../../assets/theme.svg';
type PanelsProps = {
  setOpenPanel: any, // Todo: Type this properly
  openPanel: string | ''
}
type StyleViewType = '' | 'BACKGROUND' | 'TEMPLATES';

export const DashboardPanels: React.FC<PanelsProps> = ({ setOpenPanel, openPanel }) => {

  const [size, setSize] = useState(100);


  const [stlyeView, setStlyeView] = useState<StyleViewType>('');
  const [stylePanelHeight, setStylePanelHeight] = useState(100)
  const resetViews = () => {
    setStlyeView('')
    setStylePanelHeight(100)
  }

  useEffect(() => {
    console.log(stlyeView)


  }, [stlyeView])

  return (
    <div className="dashboard-panels">
      <SlidingPanel
        type={'right'}
        isOpen={openPanel === "SECTIONS"}
        size={size}
        backdropClicked={() => setOpenPanel('')}
      >
        <>
          <div className="sections-panel__content">
            SECTIONS
            <div className="">
              <button onClick={() => setSize(40)}> REduce Size</button>
              <br />
              <br />
              <button onClick={() => setSize(80)}> Increase Size</button>
              <br />
              <br />

            </div>

          </div>
          <button onClick={() => setOpenPanel('')}>close</button>
        </>
      </SlidingPanel>
      <SlidingPanel
        type={'right'}
        isOpen={openPanel === "STYLE"}
        size={stylePanelHeight}
        backdropClicked={() => setOpenPanel('')}
        onClosed={resetViews}
      >
        <>
          <div className="style-panel__header">
            <div className="style-panel__header--icon" onClick={() => { setStylePanelHeight(100); setStlyeView('') }}>
              <Image src={arrowLeft} />
            </div>
            <p className="style-panel__header--text">
              {stlyeView === 'BACKGROUND' ? 'BACKGROUND COLOR' : stlyeView === 'TEMPLATES' ? 'TEMPLATES' : 'EDIT'} </p>

            <div className="style-panel__header--icon"> <Image src={cancelIcon} onClick={() => setOpenPanel('')} /></div>

          </div>
          <>

            <div className={`style-panel__container
             ${stlyeView === "TEMPLATES" ? 'in-templates' :
                stlyeView === "BACKGROUND" ? 'in-background' :
                  ''} `}>
              <div className="style-panel__wrapper">
                <div className={`style-panel__default ${stlyeView === '' ? 'show-section' : 'hide-section'}`}>
                  <div className="style-panel__view--option" onClick={() => setStlyeView('TEMPLATES')}>
                    <div className="style__icon"> <Image src={cancelIcon} /></div>
                    <p>Templates</p>
                  </div>
                  <div className="style-panel__view--option" onClick={() => { setStylePanelHeight(100); setStlyeView('BACKGROUND') }}>
                    <div className="style__icon"> <Image src={bgIcon} /></div>
                    <p>Background </p>
                  </div>
                </div>
                <div className={`style-panel__view ${stlyeView === 'TEMPLATES' ? 'show-section' : 'hide-section'}`}>
                  <div className="templates">
                    <p className="">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit perferendis
                      culpa animi labore perspiciatis illo id blanditiis dolore adipisci necessitatibus.
                    </p>
                  </div>

                </div>
                <div className={`style-panel__view ${stlyeView === 'BACKGROUND' ? 'show-section' : 'hide-section'}`}>
                  <div className="background-container">
                    {
                      backgroundColors.map(el => {
                        return <div className="background-option__wrapper">
                          <div className="background-option" style={{ background: el.code.hex }}> </div>
                        </div>
                      })
                    }
                  </div>

                </div>
              </div>
            </div>
          </></>
      </SlidingPanel>
    </div>
  )
}