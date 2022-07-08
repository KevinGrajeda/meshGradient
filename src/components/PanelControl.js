
import { ColorPicker } from "./ColorPicker";

function PanelControl(props) {
  const { warpRatio,noiseRatio,bgColor,colors,numberPoints}=props.gradientValues;
  let colorPickers=[];
  for(let i=0;i<numberPoints;i++){
    colorPickers.push(<ColorPicker key={i} color={colors[i]} onChange={(e)=>props.colorChange(e,i)}/>);
  }
  return (
    <div className="panel" >
      <input type="range" name="warpRatio" value={warpRatio} min="0" max="1" step="any" onChange={props.handleChange}></input>
      <input type="range" name="noiseRatio" value={noiseRatio} min="0" max="0.2" step="any" onChange={props.handleChange}></input>
      
      <ColorPicker name="bgColor" color={bgColor} onChange={(e)=>props.handleChange({target:{value:e,name:"bgColor"}})}/>
      {colorPickers}
      
      
    </div>
  );
}
export default PanelControl;