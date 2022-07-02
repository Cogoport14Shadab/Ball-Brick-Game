let ball_x,ball_y,ball_dx,ball_dy,ball_radius,ball_initia;
let paddle_x,paddle_y,paddle_dx,paddle_height,paddle_width;
let ball_initalx,ball_initialy;
let live=5,scores=0;
let numsbrick=[];
function setup() {
  createCanvas(400, 400);
  
 
 ball_x =width/2;
  ball_initialx=ball_x;
  
  ball_y=height/2+50;
  ball_initialy=ball_y+50;
  ball_dx=5;
  ball_dy=2;
  ball_radius=25;
  
  paddle_x=width/2-(80/2);
  paddle_y=height-20;
  paddle_height=15;
  paddle_width=80;
  paddle_dx=5;
  
  brick_x=60;
  brick_y=40;
  brick_height=20;
  brick_width=85;
  
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      var brickobject={
        x:((brick_width+10)*j)+20,
        y:(brick_height+20)*i+20,
        w:brick_width,
        h:brick_height,
        v:true
      };
      numsbrick.push(brickobject);
    }
  }
  
}


function draw() {
  
  
   background("black");
  ball_x+=ball_dx;
  ball_y+=ball_dy;
  if(keyIsDown(RIGHT_ARROW)){
    paddle_x+=paddle_dx;
    
  }
  if(keyIsDown(LEFT_ARROW)){
    paddle_x-=paddle_dx;
  }
  fill("white");
  
  for(var i=0; i<numsbrick.length;i++){
    if(numsbrick[i].v && balltouched(numsbrick[i],ball_x,ball_y,ball_radius/2)){
      numsbrick[i].v=false;
      scores+=1;
    }
    if(numsbrick[i].v){
      rect(numsbrick[i].x, numsbrick[i].y, numsbrick[i].w, numsbrick[i].h);
    }
    
  }
  let temp={
   x:paddle_x,
    y:paddle_y,
    w:paddle_width,
    h:paddle_height
  }
  balltouched(temp,ball_x,ball_y,ball_radius/2);

  
  circle(ball_x,ball_y,ball_radius);
  rect(paddle_x,paddle_y,paddle_width,paddle_height);
  if(ball_x + (ball_radius/2)>=width || ball_x-(ball_radius/2)<=0){
    ball_dx=-(ball_dx);
  }
  if(ball_y +(ball_radius/2)>=height || ball_y-(ball_radius/2)<=0){
    ball_dy=-(ball_dy);
  }
  if(ball_y +(ball_radius/2)>height && live>0){
     
    ball_x=ball_initialx;
    ball_y=ball_initialy;
   
   live--;
   
   
    
  }
  if(live==0 ){
    text("Game Over",200,200)
    ball_dx=0;
    ball_dy=0;
  }
  let brickV=false;
  for(var k=0;k<numsbrick.length;k++){
    if(numsbrick[k].v==true){
      brickV=true;
      break;
    }
      
  }
  if(brickV==false){
    text("Level completed",200,200);
    ball_dx=0;
    ball_dy=0;
  }
  
  
  
  
 /*if(paddle_y<ball_y+(ball_radius/2) && ball_x < paddle_x+paddle_width) {
   ball_dy=-(ball_dy);
   scores++;
   
   
 }*/
  if(paddle_x+paddle_width> width){
    paddle_x=width-paddle_width;
  }
  if(paddle_x<0){
    paddle_x=0;
  }
  
  
   text("score:"+scores,width-100,20) 
  text("lives:"+live,20,20)
    
  
}
function balltouched(brick,x,y,r){

  
  // ball touching left side of  brick
  if(x+r>=brick.x && x+r<=brick.x+brick.w && y<=brick.y + brick.h  && y>=brick.y){
    ball_dx=-ball_dx;
    return true;
    
  }
  // ball touching right side of brick
  if(x-r>=brick.x && x-r<=brick.x+brick.w && y<=brick.y + brick.h  && y>=brick.y){
    ball_dx=-ball_dx;
    return true;
    
}
  //ball touching above the brick
  if(x>=brick.x && x<=brick.x+brick.w && y+r<=brick.y + brick.h  && y+r>=brick.y){
    ball_dy=-ball_dy;
    return true;
  }
  // ball touching below the brick
  if(x>=brick.x && x<=brick.x+brick.w && y-r<=brick.y + brick.h  && y-r>=brick.y){
    ball_dy=-ball_dy;
    return true;
  }
  return false;
}
