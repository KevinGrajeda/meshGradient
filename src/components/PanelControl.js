
function PanelControl(props) {
  const { warpRatio,noiseRatio,bgColor,colors,numberPoints}=props.gradientValues;
  return (
    <div className="panel" >
      <input type="range" name="warpRatio" value={warpRatio} min="0" max="1" step="any" onChange={props.handleChange}></input>
      <input type="range" name="noiseRatio" value={noiseRatio} min="0" max="0.2" step="any" onChange={props.handleChange}></input>
      <input type="color" name="bgColor" value={bgColor} id="bgColor" onChange={props.handleChange}/>
      <input type="color" name="color-1" value={colors[0]} onChange={props.handleChange}/>
      <input type="color" name="color-2" value={colors[1]} onChange={props.handleChange}/>
      <input type="color" name="color-3" value={colors[2]} onChange={props.handleChange}/>
      <input type="color" name="color-4" value={colors[3]} onChange={props.handleChange}/>
    </div>
  );
}
export default PanelControl;