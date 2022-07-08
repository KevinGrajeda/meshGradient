import './App.css';
import {useState } from 'react';
import GradientCanvas from './components/GradientCanvas';
import PanelControl from './components/PanelControl';


function App() {
  const [gradientValues, setgradientValues] = useState({
    warpRatio: 0,
    noiseRatio: 0,
    bgColor: "#ffffff",
    colors: ["#ff0000","#00ff00","#00ffff","#ffff00"],
    numberPoints: 2,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setgradientValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const colorChange = (color,n) => {
    
    setgradientValues((prevState) => {
      let colors=prevState.colors;
      colors[n]=color;
      return {
        ...prevState,
        colors: colors,
      };
    });
    
  };

  return (
    <div className="App" >
      <GradientCanvas gradientValues={gradientValues}/>
      <PanelControl handleChange={handleChange} colorChange={colorChange} gradientValues={gradientValues}/>
      
    </div>
  );

  
}

export default App;