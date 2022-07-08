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
    numberPoints: 4,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if(name.split('-')[0]==="color"){
      setgradientValues((prevState) => {
        let colors=prevState.colors;
        colors[name.split('-')[1]-1]=value;
        return {
          ...prevState,
          colors: colors,
        };
      });
    }
    setgradientValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <div className="App" >
      <GradientCanvas gradientValues={gradientValues}/>
      <PanelControl handleChange={handleChange} gradientValues={gradientValues}/>
      
    </div>
  );

  
}

export default App;