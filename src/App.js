import './App.css';
import GradientCanvas from './components/GradientCanvas';


function App() {

    return (
        <div className="App" >
          <GradientCanvas warpRatio="0.5"/>
          <input type="range" min="0" max="1" step="any"></input>
        </div>
    );
}

export default App;