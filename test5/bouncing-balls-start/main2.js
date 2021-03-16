// 设置画布

const canvas = document.querySelector('canvas');
const text = document.querySelector('h1');

const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数

function random(min,max) {
    const num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

function randomColor() {
    return 'rgb(' +
        random(0, 255) + ', ' +
        random(0, 255) + ', ' +
        random(0, 255) + ')';
}

function Shape(x,y,velX,velY,exists){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
}

function Ball(x,y,velX,velY,exists,color,size){
    Shape.call(this,x,y,velX,velY,exists);
    this.color =color;
    this.size = size;
}
Ball.prototype = Object.create(Shape);
Ball.constructor = Ball;

Ball.prototype.update = function (){
    if(this.x>=(width-this.size)||this.x<=this.size){
        this.velX = -this.velX;
    }

    if(this.y>=(height-this.size)||this.y<=this.size){
        this.velY = -this.velY;
    }

    this.x+=this.velX;
    this.y+=this.velY;
}

Ball.prototype.draw = function (){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
    ctx.fill();
}

Ball.prototype.collisionDetect = function (){
    for(let j=0;j<ballRun.length;j++){
        if(this != ballRun[j]){
            let dx = this.x-ballRun[j].x;
            let dy = this.y-ballRun[j].y;
            let dis = Math.sqrt(dx*dx+dy*dy);
            if(dis < this.size+ballRun[j].size){
                this.color = randomColor();
                ballRun[j].color = randomColor();
            }
        }
    }
}

let ballRun = [];
let i=0;

while(ballRun.length<25){
    let ballRunSize = random(1,30);
    let color = new randomColor();
    ballRun[i] = new Ball(
        random(0+ballRunSize,width-ballRunSize),
        random(0+ballRunSize,height-ballRunSize),
        random(-7,7),
        random(-7,7),
        true,
        color,
        ballRunSize
    );
    i++;
}
//----------------------------------//
function EvilCircle(x,y,exists,aliveNum){
    Shape.call(this,x,y,50,50,exists);

    this.color = 'white';
    this.size = 50;
    this.aliveNum =aliveNum;
}
EvilCircle.prototype = Object.create(Shape);
EvilCircle.constructor = EvilCircle;

EvilCircle.prototype.draw = function (){
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
    ctx.stroke();
}

EvilCircle.prototype.checkBounds = function (){
    if(this.x>(width-this.size) || this.x<this.size){
        this.x -=this.size;
    }
    if(this.y>(height-this.size) || this.x<this.size){
        this.y-=this.size;
    }
}

EvilCircle.prototype.setControl = function (){
    window.onkeydown = e => {
        switch(e.key) {
            case 'a':
                this.x -= this.velX;
                break;
            case 'd':
                this.x += this.velX;
                break;
            case 'w':
                this.y -= this.velY;
                break;
            case 's':
                this.y += this.velY;
                break;
        }
    };
}

EvilCircle.prototype.captureDetect = function() {
    for(let j=0;j<ballRun.length;j++){

        let dx = this.x-ballRun[j].x;
        let dy = this.y-ballRun[j].y;
        let dis = Math.sqrt(dx*dx+dy*dy);
        if(dis < this.size+ballRun[j].size){
            ballRun[j].exists = false;
        }

    }
}
//-------------------------------------

let evil = new EvilCircle(50,50,true,ballRun.length);
let promptImg = document.createElement('p');
promptImg.textContent = '剩余的球数为'+evil.aliveNum;
text.appendChild(promptImg);

function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0,0,width,height);

    evil.draw();
    evil.captureDetect();
    evil.setControl();

    for(let j=0;j<ballRun.length;j++){
        if(ballRun[j].exists === true) {
            ballRun[j].draw();
            ballRun[j].collisionDetect();
            ballRun[j].update();
            evil.aliveNum++;
        }
    }
    promptImg.textContent = '剩余的球数为'+evil.aliveNum;
    evil.aliveNum=0;
    requestAnimationFrame(loop);
}





loop();





