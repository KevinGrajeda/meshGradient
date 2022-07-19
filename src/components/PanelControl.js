
import { ColorPicker } from "./ColorPicker";
import { HexColorInput } from "react-colorful";


function PanelControl(props) {
  const { warpRatio,warpSize,noiseRatio,bgColor,colors,numberPoints,randomNumber }=props.gradientValues;
  let colorPickers=[];
  for(let i=0;i<numberPoints;i++){
    colorPickers.push(
    <div key={i} className="colorDiv">
      <ColorPicker color={colors[i]} onChange={(e)=>props.colorChange(e,i)}/>
      #<HexColorInput color={colors[i]} className="colorInput" onChange={(e)=>props.handleChange({target:{value:e,name:"bgColor"}})}/>
      {i>0 ? 
      <button  id={i} className="buttonX" onClick={props.changeNumber}>
        <i className="fa-solid fa-xmark"></i>
      </button>
      :""}
    </div>)
  }

  return (
    <div className="panel" >
      <div>
        <h1>Settings</h1>
        <label htmlFor="warpRatio"><h2>Warp</h2></label>
        <div className="range">
          <i className="fa-solid fa-circle"></i>
          <input type="range"  name="warpRatio" id="warpRatio" value={warpRatio} min="0" max="1" step="any" onChange={props.handleChange}></input>
          <i className="fa-solid fa-splotch"></i>
        </div>
        <label htmlFor="warpSize"><h2>Warp Size</h2></label>
        <div className="range">
          <i className="fa-solid fa-minimize"></i>
          <input type="range" name="warpSize" id="warpSize" value={warpSize} min="0" max="2" step="any" onChange={props.handleChange}></input>
          <i className="fa-solid fa-maximize"></i>
        </div>
        <label htmlFor="noiseRatio"><h2>Noise</h2></label>
        <div className="range">
          <i className="fa-solid fa-border-all"></i>
          <input type="range" name="noiseRatio" id="noiseRatio" value={noiseRatio} min="0" max="0.2" step="any" onChange={props.handleChange}></input>
          <i className="fa-solid fa-border-none"></i>
        </div>
        <div className="line"></div>
      </div>
      <h1 className="colorTitle">Colors</h1>
      <div className="colorsMiddle">
        <div className="allColors">
          <div className="colorDiv">
            <ColorPicker name="bgColor" color={bgColor} onChange={(e)=>props.handleChange({target:{value:e,name:"bgColor"}})}/>
            #<HexColorInput color={bgColor} className="colorInput" onChange={(e)=>props.handleChange({target:{value:e,name:"bgColor"}})}/>
          </div>
          
          {colorPickers}
          {numberPoints<10 ? 
            <div className="colorDiv">
              <button  id="+" onClick={props.changeNumber}>
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          :""}
        </div>
      </div>
      <div>
        <div className="line"></div>
        <div className="centerButtons">
          <button className="widerButton" name="randomNumber" value={+randomNumber+1} onClick={props.handleChange}>
            Generate<i className="fa-solid fa-arrows-rotate"></i>
          </button>
          
          <button className="widerButton" name="randomNumber"  onClick={props.setDownloadMostrar}>
            Download<i className="fa-solid fa-download"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
export default PanelControl;