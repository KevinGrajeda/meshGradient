import './App.css';
import {useState } from 'react';
import GradientCanvas from './components/GradientCanvas';
import PanelControl from './components/PanelControl';


function App() {
  const [gradientValues, setgradientValues] = useState({
    warpRatio: 0.8,
    noiseRatio: 0.05,
    bgColor: "#000000",
    colors: ["#ff0000","#0000ff"],
    numberPoints: 2,
    //positions: [[1,0],[0,1]],
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
  const changeNumber = (event) => {
    const {value} = event.target;
    setgradientValues((prevState) => {
      let newColors=prevState.colors;
      let newNumberPoints=prevState.numberPoints;
      //let newPositions=prevState.positions;
      if(value==="+"){
        newNumberPoints++;
        newColors.push("#444444");
        //newPositions.push([Math.random(),Math.random()]);
      }else{
        newNumberPoints--;
        newColors.pop();
        //newPositions.pop();
      }
      return {
        ...prevState,
        numberPoints: newNumberPoints,
        colors: newColors,
      };
    });
    
  };

  return (
    <div className="App" >
      <GradientCanvas gradientValues={gradientValues}/>
      <PanelControl handleChange={handleChange} changeNumber={changeNumber} colorChange={colorChange} gradientValues={gradientValues}/>
      
    </div>
  );

  
}

export default App;