const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);

const bglayer1=new Image();
bglayer1.src='layer-1.png';
const bglayer2=new Image();
bglayer2.src='layer-2.png';
const bglayer3=new Image();
bglayer3.src='layer-3.png';
const bglayer4=new Image();
bglayer4.src='layer-4.png';
const bglayer5=new Image();
bglayer5.src='layer-5.png';

let gamespeed=5;

const range = document.getElementById("range");

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

range.addEventListener("input", (e) => {
  const value = +e.target.value;
  const label = e.target.nextElementSibling;
  const rangeWidth = getComputedStyle(e.target).getPropertyValue("width");
  const labelWidth = getComputedStyle(label).getPropertyValue("width");
  const numWidth = +rangeWidth.substring(0, rangeWidth.length - 2);
  const numLabelWidth = +labelWidth.substring(0, labelWidth.length - 2);
  const max = +e.target.max;
  const min = +e.target.min;
  const left =
    value * (numWidth / max) -
    numLabelWidth / 2 +
    scale(value, min, max, 10, -10);
  label.style.left = `${left}px`;
  label.innerHTML = value;
  gamespeed = value;
});

class Layer {
    constructor(image,speedModifier){
        this.x=0;
        this.y=0;
        this.width=2400;
        this.height=700;
        this.x2=this.width;
        this.image=image;
        this.speedModifier=speedModifier;
        this.speed=gamespeed*this.speedModifier;
    }

    update(){
        this.speed=gamespeed*this.speedModifier;
        if(this.x<=-this.width){
            this.x=this.width+this.x2-this.speed;
        }
        if(this.x2<=-this.width){
            this.x2=this.width+this.x-this.speed;
        }
        this.x=Math.floor(this.x-this.speed);
        this.x2=Math.floor(this.x2-this.speed);
    }
    draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image,this.x2,this.y,this.width,this.height);
    }
}

const layer1=new Layer(bglayer1,0.5);
const layer2=new Layer(bglayer2,1);
const layer3=new Layer(bglayer3,1.5);
const layer4=new Layer(bglayer4,2);
const layer5=new Layer(bglayer5,2.5);

const layers=[layer1,layer2,layer3,layer4,layer5];

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  layers.forEach((layer)=>{
    layer.update();
    layer.draw();
  })
  requestAnimationFrame(animate);
}
animate();