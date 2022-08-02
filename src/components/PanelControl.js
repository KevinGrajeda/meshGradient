
import { RangeSelectors } from "./RangeSelectors";
import { ColorSelectors } from "./ColorSelectors";




function PanelControl(props) {
  const { warpRatio, warpSize, noiseRatio, bgColor, colors, numberPoints, randomNumber } = props.gradientValues;
  

  return (
    <div className="panel" >
      <RangeSelectors handleChange={props.handleChange} warpRatio={warpRatio} warpSize={warpSize} noiseRatio={noiseRatio}></RangeSelectors>
      <ColorSelectors handleChange={props.handleChange} colorChange={props.colorChange} changeNumber={props.changeNumber} bgColor={bgColor} numberPoints={numberPoints} colors={colors}></ColorSelectors>
      <div>
        <div className="line"></div>
        <div className="centerButtons">
          <button className="widerButton" name="randomNumber" value={+randomNumber + 1} onClick={props.handleChange}>
            <span>Generate</span><i className="fa-solid fa-arrows-rotate"></i>
          </button>

          <button className="widerButton" name="randomNumber" onClick={props.setDownloadMostrar}>
            <span>Download</span><i className="fa-solid fa-download"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
export default PanelControl;