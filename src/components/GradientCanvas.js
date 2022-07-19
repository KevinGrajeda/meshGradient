import { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import vert from './shader.vert'
import frag from './shader.frag'


function GradientCanvas(props) {
  const containerRef = useRef();
  
  const [sketch, setSketch] = useState(undefined);
  
  const Sketch = (p) => {
    let { widthExport, heightExport, randomNumber, warpRatio,warpSize,noiseRatio,bgColor,colors,numberPoints}=props.gradientValues;
    randomNumber=+randomNumber;
    let theShader;
    let spaceCount=p.random(100);
    let positionsUniforms=[];
    let canvasDiv;
    let showPoints=false;
    let points=[];

    p.preload= function() {
      theShader = p.loadShader(vert, frag);
    }

    p.setup= function() {
      p.pixelDensity(1);
      canvasDiv = document.getElementById('GradientCanvas');
      let cnv = p.createCanvas(400, 400, p.WEBGL);
      cnv.mouseOver(()=>{showPoints=true});
      cnv.mouseOut(()=>{showPoints=false});
      const gl = p.canvas.getContext('webgl');
      gl.disable(gl.DEPTH_TEST);
      p.windowResized();
      
      p.noStroke();

      for(let i=0;i<10;i++){
        points.push({
          x : p.random()*p.width,
          y : p.random()*p.height,
          clicked : false,
          color: i>=numberPoints?'#444444':colors[i],
        });
      }
      pointsToUniform();
    }

    p.draw= function()  {
      p.background(0);
      theShader.setUniform("u_resolution", [p.width, p.height]);
      theShader.setUniform("u_time",spaceCount+randomNumber);
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
      theShader.setUniform("u_warpSize",warpSize);
      p.shader(theShader);  
      p.rect(0, 0, p.width, p.height);
      if(showPoints){
        p.drawPoints();
      }
    }

    p.windowResized= function()  {
      var computedStyle = getComputedStyle(canvasDiv);

      let elementHeight = canvasDiv.clientHeight;
      let elementWidth = canvasDiv.clientWidth;
      elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
      elementWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
      if(elementHeight<elementWidth){
        p.resizeCanvas(elementHeight, elementHeight);
      }else{
        p.resizeCanvas(elementWidth, elementWidth);

      }
    }
    p.drawPoints= function(){
      p.resetShader();
      p.translate(-p.width/2,-p.height/2);
      //p.circle(-p.width/2,-p.width/2,50);
      for(let i=0;i<numberPoints;i++){
        p.fill(255);
        p.circle(points[i].x,points[i].y,20);
        p.fill(points[i].color);
        p.circle(points[i].x,points[i].y,15);
      }
    }
    
    p.mousePressed = function(){
      for(let i=0;i<numberPoints;i++){
        let dist = p.dist(p.mouseX, p.mouseY, points[i].x, points[i].y);
        points[i].clicked = dist < 10;
      }
    }
    p.mouseDragged = function(){
      for(let i=0;i<numberPoints;i++){
        if(points[i].clicked){
          points[i].x=p.mouseX;
          points[i].y=p.mouseY;
        }
      }
      pointsToUniform();
    }
    function pointsToUniform(){
      positionsUniforms=[];
      for(let i=0;i<numberPoints;i++){
        positionsUniforms.push(points[i].x/p.width,points[i].y/p.height);
      }
    }
    p.keyPressed= function(){
      if (p.key === ' '){
        randomizar();
      }
    }
    p.download=function(){
      let w=p.width;
      let h=p.height;
      p.resizeCanvas(widthExport, heightExport);
      p.save("meshGradient.png");
      p.resizeCanvas(w, h);
    }

    function randomizar(){
      spaceCount++;
      positionsUniforms=[];
      for(let i=0;i<numberPoints;i++){
        points[i].x=p.random()*p.width;
        points[i].y=p.random()*p.height;
      }
      pointsToUniform();
    }

    
    p.updateProps=function(props){
      if(randomNumber!==+props.gradientValues.randomNumber){
        randomizar();
      }
      ({ widthExport, heightExport, randomNumber,warpRatio,warpSize,noiseRatio,bgColor,colors,numberPoints }= props.gradientValues);
      randomNumber=+randomNumber;
      for(let i=0;i<numberPoints;i++){
        points[i].color=colors[i];
      }
    }

    function hexToRgb(hex) {
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
      });
    
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? [
        parseInt(result[1], 16)/255,
        parseInt(result[2], 16)/255,
        parseInt(result[3], 16)/255,
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
          //console.log('removing sketch!');
          // Removing p5.js sketch because the component is un-mounting
          sketch.remove();
        }
      };
    },
    // This effect needs to be re-initialized *after* the sketch gets created
    [sketch]
  );
  useEffect(
    () => {
      if(props.download){
        sketch.download();
        props.setDownload(false);
      }
    },
    [props.download]
  );
    return (
      <div className="contenedorCanvas" id="contenedorCanvas">
        <div className="GradientCanvas" id="GradientCanvas" ref={containerRef} >
        </div>
      </div>
    );
}
export default GradientCanvas;