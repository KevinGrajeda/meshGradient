
import { ColorPicker } from "./ColorPicker";
import { HexColorInput } from "react-colorful";


function PanelControl(props) {
  const { warpRatio,noiseRatio,bgColor,colors,numberPoints,randomNumber }=props.gradientValues;
  let colorPickers=[];
  for(let i=0;i<numberPoints;i++){
    colorPickers.push(
    <div key={i} className="colorDiv">
      <ColorPicker  color={colors[i]} onChange={(e)=>props.colorChange(e,i)}/>
      #<HexColorInput color={colors[i]} className="colorInput" onChange={(e)=>props.handleChange({target:{value:e,name:"bgColor"}})}/>
      {i>0 ? 
      <button  id={i} onClick={props.changeNumber}>
        <i className="fa-solid fa-xmark"></i>
      </button>
      :""}
    </div>)
  }

  return (
    <div className="panel" >
      <label htmlFor="warpRatio">Warp</label>
      <div className="range">
        <i className="fa-solid fa-circle"></i>
        <input type="range"  name="warpRatio" id="warpRatio" value={warpRatio} min="0" max="1" step="any" onChange={props.handleChange}></input>
        <i className="fa-solid fa-splotch"></i>
      </div>
      <label htmlFor="warpRatio">Noise</label>
      <div className="range">
        <i className="fa-solid fa-camera"></i>
        <input type="range" name="noiseRatio" id="noiseRatio" value={noiseRatio} min="0" max="0.2" step="any" onChange={props.handleChange}></input>
        <i className="fa-solid fa-camera-retro"></i>
      </div>
      <div className="line"></div>
      Colors
      
      
      <br/>
      <div className="allColors">
        <div className="colorDiv">
          <ColorPicker name="bgColor" color={bgColor} onChange={(e)=>props.handleChange({target:{value:e,name:"bgColor"}})}/>
          #<HexColorInput color={bgColor} className="colorInput" onChange={(e)=>props.handleChange({target:{value:e,name:"bgColor"}})}/>
        </div>
        
        {colorPickers}
        {numberPoints<10 ? 
        <button  id="+" onClick={props.changeNumber}>
          <i className="fa-solid fa-plus"></i>
        </button>
        :""}
      </div>
      Randomize
      <button name="randomNumber" value={+randomNumber+1} onClick={props.handleChange}>
        <i className="fa-solid fa-dice-six"></i>
      </button>
      Download
      <button name="randomNumber"  onClick={props.setDownloadMostrar}>
        <i className="fa-solid fa-download"></i>
      </button>
    </div>
  );
}
export default PanelControl;