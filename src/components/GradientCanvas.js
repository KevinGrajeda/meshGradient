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
    

    
    p.preload= function() {
      theShader = p.loadShader(vert, frag);
    }

    p.setup= function() {
      p.pixelDensity(1);
      p.createCanvas(700, 300, p.WEBGL);

      
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
      let positions=[];
      positions.push(0,1);
      positions.push(1,1);
      positions.push(1,0);
      positions.push(0,0);
      theShader.setUniform("u_positions",positions);
      theShader.setUniform("u_numberPoints",numberPoints);
      theShader.setUniform("u_noiseRatio",noiseRatio);
      theShader.setUniform("u_warpRatio",warpRatio);
      p.shader(theShader);  
      p.rect(0, 0, p.width, p.height);
    }

    //p.windowResized= function()  {
    //    p.resizeCanvas(p.windowWidth, p.windowHeight);
    //}

    p.keyPressed= function(){
      if (p.key === ' '){
        spaceCount++;
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
      <div className="GradientCanvas" ref={containerRef} >
      </div>
    );
}
export default GradientCanvas;