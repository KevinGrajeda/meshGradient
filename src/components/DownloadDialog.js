
function DownloadDialog(props) {
  let { widthExport, heightExport }=props.gradientValues;
  return(
    <div className='downloadDialog' >
      <div className='downloadContainer'>
        <button className="buttonX" name="salir" onClick={()=>props.setDownloadMostrar(false)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h1>Select size</h1>
        <div className="centerButtons">
          <div>
            <label htmlFor="width"><h2>Width</h2></label>
            <input className="inputSize" type="number" name="widthExport" id="widthExport" value={widthExport} min="0" max="10000"  onChange={props.handleChange}></input>
          </div>
          <h2>x</h2>
          <div>
            <label htmlFor="heightExport"><h2>Height</h2></label>
            <input className="inputSize" type="number" name="heightExport" id="heightExport" value={heightExport} min="0" max="10000"  onChange={props.handleChange}></input>
          </div>
        </div>
        <button name="download" className="widerButton" onClick={()=>{
          props.setDownload(true);
          props.setDownloadMostrar(false);
          }}>
          Download
          <i className="fa-solid fa-download"></i>
        </button>

      </div>
    </div>
  )
}
export default DownloadDialog;