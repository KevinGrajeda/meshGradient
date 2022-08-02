import { ColorPicker } from "./ColorPicker";
import { HexColorInput } from "react-colorful";

export function ColorSelectors(props) {
  const {colors, numberPoints}=props;
  let colorPickers = [];

  
  for (let i = 0; i < numberPoints; i++) {
    colorPickers.push(
      <div key={i} className="colorDiv">
        <ColorPicker color={colors[i]} onChange={(e) => props.colorChange(e, i)} />
        #<HexColorInput color={colors[i]} className="colorInput" onChange={(e) => props.colorChange(e, i)} />
        {i > 0 ?
          <button id={i} className="buttonX" onClick={props.changeNumber}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          : ""}
      </div>)
  }

  function changeBgColor(e){
    props.handleChange({
      target: {
        value: e,
        name: "bgColor"
      }
    });
  }

  return (<>
    <h1 className="colorTitle">Colors</h1>
    <div className="colorsMiddle">
      <div className="allColors">
        <div className="colorDiv">
          <ColorPicker name="bgColor" color={props.bgColor} onChange={changeBgColor} />
          #<HexColorInput color={props.bgColor} className="colorInput" onChange={changeBgColor} />
        </div>

        {colorPickers}
        {props.numberPoints < 10 ? <div className="colorDiv">
          <button id="+" onClick={props.changeNumber}>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div> : ""}
      </div>
    </div>
  </>);
}
