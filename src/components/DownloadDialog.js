
function DownloadDialog(props) {
  let { widthExport, heightExport }=props.gradientValues;
  return(
    <div className='downloadDialog' >
      <div className='downloadContainer'>
        <button name="salir" onClick={()=>props.setDownloadMostrar(false)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h1>Download</h1>
        <label htmlFor="width">Width</label>
        <input className="inputSize" type="number" name="widthExport" id="widthExport" value={widthExport} min="0" max="10000"  onChange={props.handleChange}></input>
        <label htmlFor="heightExport">Height</label>
        <input className="inputSize" type="number" name="heightExport" id="heightExport" value={heightExport} min="0" max="10000"  onChange={props.handleChange}></input>
        
        <button name="download" onClick={()=>props.setDownload(true)}>
          <i className="fa-solid fa-download"></i>
        </button>
      </div>
    </div>
  )
}
export default DownloadDialog;