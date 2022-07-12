import { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import vert from './shader.vert'
import frag from './shader.frag'


function GradientCanvas(props) {
  const containerRef = useRef();
  
  const [sketch, setSketch] = useState(undefined);
  
  const Sketch = (p) => {
    let { warpRatio,noiseRatio,bgColor,colors,numberPoints}=props.gradientValues;
    let theShader;
    let spaceCount=p.random(100);
    let positionsUniforms=[];
    let canvasDiv;

    for(let i=0;i<10;i++){
      positionsUniforms.push(p.random(),p.random());
    }
    //positionsUniforms.push(0.,0.5);
    //positionsUniforms.push(1,0.5);
    
    p.preload= function() {
      theShader = p.loadShader(vert, frag);
    }

    p.setup= function() {
      p.pixelDensity(1);
      canvasDiv = document.getElementById('GradientCanvas');
      var computedStyle = getComputedStyle(canvasDiv);

      let elementHeight = canvasDiv.clientHeight;
      let elementWidth = canvasDiv.clientWidth;
      elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
      elementWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
      p.createCanvas(elementWidth, elementWidth, p.WEBGL);

      
      p.noStroke();
    }

    p.draw= function()  {
      p.background(0);
      theShader.setUniform("u_resolution", [p.width, p.height]);
      theShader.setUniform("u_time",spaceCount);
      theShader.setUniform("u_bgColor",hexToRgb(bgColor));
      let colorsUniform=[];
      for(let i=0;i<numberPoints;i++){
        colorsUniform.push(...hexToRgb(colors[i]));
      }
      theShader.setUniform("u_colors",colorsUniform);
      
      theShader.setUniform("u_positions",positionsUniforms);
      theShader.setUniform("u_numberPoints",numberPoints);
      theShader.setUniform("u_noiseRatio",noiseRatio);
      theShader.setUniform("u_warpRatio",warpRatio);
      theShader.setUniform("u_mouse",[p.mouseX,p.mouseY]);
      p.shader(theShader);  
      p.rect(0, 0, p.width, p.height);
    }

    p.windowResized= function()  {
      var computedStyle = getComputedStyle(canvasDiv);

      let elementHeight = canvasDiv.clientHeight;
      let elementWidth = canvasDiv.clientWidth;
      elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
      elementWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
      
      p.resizeCanvas(elementWidth, elementWidth);
    }

    p.keyPressed= function(){
      if (p.key === ' '){
        spaceCount++;
        positionsUniforms=[];
        for(let i=0;i<numberPoints;i++){
          positionsUniforms.push(p.random(-0.2,1.2),p.random(-0.2,1.2));
        }
      }
    }

    p.updateProps=function(props){
      ({ warpRatio,noiseRatio,bgColor,colors,numberPoints }= props.gradientValues);
    }

    function hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? [
        parseInt(result[1], 16)/255,
        parseInt(result[2], 16)/255,
        parseInt(result[3], 16)/255
      ] : null;
    }
  }


  useEffect(
    () => {
      if (!sketch) {
        // Initialize sketch
        let inst = new p5(Sketch, containerRef.current);
      
        setSketch(inst);
      } else {
        // Update sketch
        sketch.updateProps(props);
      }
      
      // We cannot return a cleanup function here, be cause it would run every time the dataFromSibling prop changed
    },
    // Let React know that this effect needs re-rendering when the dataFromSibling prop changes
    [props]
  );
  
  useEffect(
    () => {
      // This effect is only responsible for cleaning up after the previous one 😅
      return () => {
        if (sketch) {
          console.log('removing sketch!');
          // Removing p5.js sketch because the component is un-mounting
          sketch.remove();
        }
      };
    },
    // This effect needs to be re-initialized *after* the sketch gets created
    [sketch]
  );
    return (
      <div className="contenedorCanvas" id="contenedorCanvas">
        <div className="GradientCanvas" id="GradientCanvas" ref={containerRef} >
        </div>
      </div>
    );
}
export default GradientCanvas;