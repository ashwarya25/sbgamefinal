var sb,sbImage,sbImage2
var bg,bgImage
var patty,pattyImage,pattygroup;
var ground;
var giantBurger,giantBurgerImage,giantBurgerImage2
var PLAY=1;
var END=0;
var gameState=PLAY

var gameOver,gameOverImage
function preload(){
  sbImage=loadAnimation("images/sb1.png","images/sb3.png","images/sb5.png")
  sbImage2=loadAnimation("images/sb5.png")
  bgImage=loadImage("images/bg.jpg")
  pattyImage=loadImage("images/pattty.png")
 
  gameOverImage=loadImage("images/gameOver.png")
  giantBurgerImage=loadAnimation("images/g1.png","images/g2.png")
  giantBurgerImage2=loadAnimation("images/g2.png")
}
function setup()
 {
    createCanvas(1650,1300);

bg=createSprite(1000,700,2600,1000)
bg.addImage(bgImage)
bg.scale=3.5

bg.x=bg.width/2

ground=createSprite(800,1280,1680,30)
ground.visible=false;

giantBurger=createSprite(1550,random(100,1200),400,400)
giantBurger.addAnimation("eating",giantBurgerImage)
giantBurger.addAnimation("stopeating",giantBurgerImage2)
giantBurger.scale=2

giantBurger.setCollider("circle",-30,0,100)

sb=createSprite(giantBurger.x-300,950,10,10)
sb.addAnimation("running",sbImage)
sb.addAnimation("stop",sbImage2)
sb.scale=1.5;
sb.setCollider("rectangle",15,0,70,100)


pattygroup= new Group()



gameOver=createSprite(800,450)
gameOver.addImage(gameOverImage)
gameOver.visible=false;
   
}

function draw() 
{
  background("peachpuff"); 
  if(gameState===PLAY)
  {
    bg.velocityX=10
    if(bg.x>1300)
    {
      bg.x=bg.width/2
    }
    if(keyDown("SPACE"))
    {
      sb.velocityY=-10;
    }
      sb.velocityY=sb.velocityY+0.5

    if(keyDown(LEFT_ARROW))
    {
      sb.x=sb.x-3
    }
    if(keyDown(RIGHT_ARROW) &&sb.x<1650)
    {
      sb.x=sb.x+3
    }
        
    sb.collide(ground);
    pattyObstacle()
   
    if(pattygroup.isTouching(sb) ||giantBurger.isTouching(sb)){
     gameState=END
    }
  }
  else if(gameState===END){
    bg.velocityX=0;
    sb.velocityX=0;
    sb.velocityY=0;
    pattygroup.setLifetimeEach(-1)
    pattygroup.setVelocityXEach(0)
    gameOver.visible=true
    giantBurger.changeAnimation("stopeating",giantBurgerImage2)
    sb.changeAnimation("stop",sbImage2)
    //textSize(20)
    //text("Press R to restart",500,600)
    if(keyDown("r"))
    {
     reset()
    }
  }
  
  drawSprites();
}

function pattyObstacle(){
  if(frameCount%80===0){
    patty=createSprite(0,random(100,1200),30,30)
    patty.setCollider("rectangle",0,0,50,70)
    patty.debug=true;
    patty.addImage(pattyImage)
    patty.velocityX=12
    patty.scale=0.3
    patty.lifetime=200
    pattygroup.add(patty)
  }
  
  
}
function reset()
{
  gameState=PLAY;
  gameOver.visible=false;
  pattygroup.setLifetimeEach(0); 
}
function bigburger(){
  
}