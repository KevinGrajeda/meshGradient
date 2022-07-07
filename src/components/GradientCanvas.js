import { useEffect, useRef } from 'react';
import p5 from 'p5';
import vert from './shader.vert'
import frag from './shader.frag'

function sketch(p) {
    let theShader;
    let spaceCount=0;
    
    p.preload= function() {
        //console.log("pepe");
        theShader = p.loadShader(vert, frag);
    }

    p.setup= function() {
        //p.pixelDensity(1);
        p.createCanvas(400, 400, p.WEBGL);

        
        p.noStroke();
    }

    p.draw= function()  {
        p.background(0);
        
        theShader.setUniform("u_resolution", [p.width, p.height]);
        theShader.setUniform("u_time",spaceCount);
        theShader.setUniform("u_bgColor",[1,0.5,1]);
        let colors=[];
        colors.push(0.5,0,6);
        colors.push(1,0,0.7);
        colors.push(1,1,1);
        colors.push(0,0,0);
        theShader.setUniform("u_colors",colors);
        let positions=[];
        positions.push(1,0);
        positions.push(0,0);
        positions.push(1,1);
        positions.push(0,1);
        theShader.setUniform("u_positions",positions);
        theShader.setUniform("u_numberPoints",positions.length/2);
        theShader.setUniform("u_noiseRatio",0.15);
        theShader.setUniform("u_warpRatio",2);
        p.shader(theShader);  
        p.rect(0, 0, p.width, p.height);
    }

    /*p.windowResized= function()  {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }*/

    p.keyPressed= function(){
        if (p.key === ' '){
            spaceCount++;
        }
    }
}

function GradientCanvas(props) {
    // create a reference to the container in which the p5 instance should place the canvas
    const p5ContainerRef = useRef();
    //console.log(props);
    useEffect(() => {
        // On component creation, instantiate a p5 object with the sketch and container reference 
        const p5Instance = new p5(sketch, p5ContainerRef.current);

        // On component destruction, delete the p5 instance
        return () => {
            p5Instance.remove();
        }
    }, []);

    return (
        <div className="GradientCanvas" ref={p5ContainerRef} >
        </div>
    );
}

export default GradientCanvas;