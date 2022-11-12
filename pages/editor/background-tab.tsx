import backgroundColors from "./background-colors";

export const BackgroundTabs = () => {
  return (
    <div className="background-tab">
      <div className="background-container">
        {backgroundColors.map((el, index) => {
          return (
            <div key={index} className="background-option__wrapper">
              <div className="background-option" style={{ background: el.code.hex }}>
                {" "}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
