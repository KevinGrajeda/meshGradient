
import { ColorPicker } from "./ColorPicker";

function PanelControl(props) {
  const { warpRatio,noiseRatio,bgColor,colors,numberPoints}=props.gradientValues;
  let colorPickers=[];
  for(let i=0;i<numberPoints;i++){
    colorPickers.push(<ColorPicker key={i} color={colors[i]} onChange={(e)=>props.colorChange(e,i)}/>);
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
      <ColorPicker name="bgColor" color={bgColor} onChange={(e)=>props.handleChange({target:{value:e,name:"bgColor"}})}/>
      
      {numberPoints<10?<input type="button" value="+" onClick={props.changeNumber}/>:""}
      {numberPoints>1?<input type="button" value="-" onClick={props.changeNumber}/>:""}
      {colorPickers}
      
      
    </div>
  );
}
export default PanelControl;