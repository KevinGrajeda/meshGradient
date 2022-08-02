export function RangeSelectors(props) {
  return (<div>
    <h1>Settings</h1>
    <label htmlFor="warpRatio"><h2>Warp</h2></label>
    <div className="range">
      <i className="fa-solid fa-circle"></i>
      <input type="range" name="warpRatio" id="warpRatio" value={props.warpRatio} min="0" max="1" step="any" onChange={props.handleChange}></input>
      <i className="fa-solid fa-splotch"></i>
    </div>
    <label htmlFor="warpSize"><h2>Warp Size</h2></label>
    <div className="range">
      <i className="fa-solid fa-minimize"></i>
      <input type="range" name="warpSize" id="warpSize" value={props.warpSize} min="0" max="2" step="any" onChange={props.handleChange}></input>
      <i className="fa-solid fa-maximize"></i>
    </div>
    <label htmlFor="noiseRatio"><h2>Noise</h2></label>
    <div className="range">
      <i className="fa-solid fa-border-all"></i>
      <input type="range" name="noiseRatio" id="noiseRatio" value={props.noiseRatio} min="0" max="0.2" step="any" onChange={props.handleChange}></input>
      <i className="fa-solid fa-border-none"></i>
    </div>
    <div className="line"></div>
  </div>);
}

