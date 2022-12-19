import './App.css';
import {useState, useCallback} from 'react';
import GradientCanvas from './components/GradientCanvas';
import PanelControl from './components/PanelControl';
import DownloadDialog from './components/DownloadDialog';


function App() {
  const [gradientValues, setgradientValues] = useState({
    warpRatio: 0.8,
    warpSize: 1,
    noiseRatio: 0.05,
    bgColor: "#000000",
    colors: ["#ff0000","#0000ff"],
    numberPoints: 2,
    randomNumber:1,
    //positions: [[1,0],[0,1]],
    widthExport:500,
    heightExport:500,
  });
  
  const [downloadMostrar, setDownloadMostrar] = useState(false);
  const [download, setDownload] = useState(false);
  const [share, setShare] = useState(false);
  
  
  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setgradientValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  },[]);

  const colorChange = useCallback((color,n) => {
    
    setgradientValues((prevState) => {
      let colors=prevState.colors;
      colors[n]=color;
      return {
        ...prevState,
        colors: colors,
      };
    });
  }, []);
  
  const changeNumber = useCallback((event) => {
    const {id} = event.target;
    setgradientValues((prevState) => {
      let newColors=prevState.colors;
      let newNumberPoints=prevState.numberPoints;
      if(id==="+"){
        newNumberPoints++;
        newColors.push("#444444");
      }else{
        newNumberPoints--;
        newColors.splice(id,1);
      }
      return {
        ...prevState,
        numberPoints: newNumberPoints,
        colors: newColors,
      };
    });
    
  }, [gradientValues.colors,gradientValues.numberPoints]);

  return (
    <div className="App" >
      {downloadMostrar?
        <DownloadDialog setShare={setShare} setDownload={setDownload} setDownloadMostrar={setDownloadMostrar} gradientValues={gradientValues} handleChange={handleChange} download={download} share={share}/>
      :""}
      <div className="Contenedor">
        <GradientCanvas share={share} download={download} setShare={setShare} setDownload={setDownload} gradientValues={gradientValues}/>
        <PanelControl setDownloadMostrar={setDownloadMostrar} handleChange={handleChange} changeNumber={changeNumber} colorChange={colorChange} gradientValues={gradientValues}/>
      </div>
    </div>
  );

  
}

export default App;