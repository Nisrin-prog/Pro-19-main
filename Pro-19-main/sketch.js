var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy, boy_running;
var bg

var animalsGroup, lion, crocodile, elephant, fox, snake;

var score = 0;
var coins = 0;

var gameOver, restart;
var coinGroup


function preload(){
  boy_running =   loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png","boy5.png","boy6.png","boy7.png","boy8.png");
  
  bg = loadImage("Forest.jpg");
  
  lion = loadImage("lion.png");
  crocodile = loadImage("crocodile.png");
  elephant = loadImage("elephant.png");
  fox = loadImage("fox.png");
  snake = loadImage("snake.png");
  
  gameOverImg = loadImage("game_over.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  boy = createSprite(50,windowHeight-20,20,50);
  boy.addAnimation("running", boy_running);
  boy.scale = 0.30;
  
  coinGroup = new Group()
  gameOver = createSprite(750,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(750,200);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 1;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,windowHeight,400,10);
  invisibleGround.visible = false;
  
  animalsGroup = new Group();
  
  score = 0;
  
}

function draw() {;
  background(bg);
  textSize(30)
  fill("black")
  text("Score: "+ score, 20,40);
  textSize(30)
  fill("black")
  text("coin: "+ coins, 20,70);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    bg.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && boy.y >= windowHeight-159) {
      boy.velocityY = -15;
    }
  
    boy.velocityY = boy.velocityY + 0.8
    boy.collide(invisibleGround);
    spawnanimals();
    spawncoins();
  
    coinGroup.overlap(boy,pluscoins)
  
    if(animalsGroup.isTouching(boy)){
        gameState = END;
      }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    boy.velocityY = 0;
    boy.changeAnimation("boy1.png")
    animalsGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    animalsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  drawSprites();
}

function spawnanimals() {
  if(frameCount % 80 === 0) {
    var animal = createSprite(windowWidth-100,windowHeight-40,10,40);
    animal.velocityX = -(8 + 3*score/250);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: animal.addImage(lion);
              break;
      case 2: animal.addImage(crocodile);
              break;
      case 3: animal.addImage(elephant);
              break;
      case 4: animal.addImage(fox);
              break;
      case 5: animal.addImage(snake);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the animals        
    animal.scale = 1.1
    animal.lifetime = 300;
    //add each animal to the group
    animalsGroup.add(animal);
  }
}

function spawncoins() {
  if(frameCount%120===0){
  var coin = createSprite(windowWidth-100,windowHeight-40,10,40);
  coinGroup.add(coin)
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  animalsGroup.destroyEach();
  
  boy.changeAnimation("running",boy_running);
  score = 0;
  
}
function pluscoins(sprA){
  sprA.destroyEach()
  coins = coins+1;
}