let mycanvas;
let snow = [];
let gravity;
let zOff = 0;

let mic;

let input;


function setup() {
  mycanvas = createCanvas(innerWidth, 750);
  mycanvas.position(0,0);
  gravity = createVector(0,-0.1);
    
     //audio input for circle 
        mic = new p5.AudioIn();
        mic.start();
    
    // Create an Audio input
        input = new p5.AudioIn();

        input.start();
    

}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    var fs = fullscreen();
    fullscreen(!fs);
  }
}

function draw() {
 background(250,100);
            let x = random(width);
            let y = random(height);

      zOff += 0.1;
            let vol = mic.getLevel();

                    snow.push(new Snowflake(x,height,vol));
        

    for(flake of snow)
        {
            let xOff = flake.pos.x / width;
            let yOff = flake.pos.y / height;
            let wAngle = noise(xOff, yOff, zOff) * TWO_PI;
            let wind = p5.Vector.fromAngle(wAngle);
            wind.mult(0.1);
            
            
            flake.applyforce(gravity);
            flake.applyforce(wind);
            flake.render();
            flake.update();
        }
    
    
            if(snow.length > 5000)
                {
                   snow.splice(0,1);  
                }
           
        
}
function getRendomSize()
{
    let r = pow(random(0.5,1),5);
    return constrain(r*10,2,20);

}
class Snowflake
    {
        constructor(sx, sy,vol)
        {
            this.vol = vol;
          //  let vol = mic.getLevel();
            let x = sx || random(width);
            let y = sy || random(-100,-10);
            this.pos = createVector(x,y);
            this.vel = createVector(0,5);
            this.acc = createVector();
            this.r = getRendomSize();
        }
        applyforce(force)
        {
            let f = force.copy();
            f.mult(this.r);
            this.acc.add(f);
        }
        randomize(vol)
        {
            this.vol = vol;
           // let vol = mic.getLevel();
            let x = random(width);
            let y = random(-100,-10);
            this.pos = createVector(x,y);
            this.vel = createVector(0,5);
            this.acc = createVector();
            this.r = getRendomSize(); 
        }
        update()
        {
            this.vel.add(this.acc);
            this.vel.limit(this.r*this.vol);
            //this.acc = gravity;
           if(this.vel.mag()<1)
              {
              this.vel.normalize();
              }
            
            
            this.pos.add(this.vel);
            this.acc.mult(0);
            
            if(this.pos.y<0+this.r)
                {
                    this.randomize();
                }
            
             // Wrapping Left and Right
        if (this.pos.x < -this.r) {
            this.pos.x = width + this.r;
        }
        if (this.pos.x > width + this.r) {
        this.pos.x = -this.r;
        }
            
        }
        offScreen()
        {
            
        }
        render()
        {
           noStroke();
           // stroke(this.vol*1000);
            if(frameCount%50>25)
                {
           fill(this.vol*1000,this.vol*400,255); 
                }
            else if(frameCount%50<=25)
            {
           fill(0,this.vol*500,this.vol*1000); 
            }
            
            ellipse(this.pos.x,this.pos.y,this.r+this.vol*500);
            
        }
        
    }
