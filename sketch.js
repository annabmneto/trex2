var trex, trex_correndo, trexcolide
     
var solo, soloinvisivel, imagemdosolo;

var nuvem, grupodenuvens, imagemdanuvem;
var grupodeobstaculos, obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;

var jogar=1

var reiniciar, reiniciarimage

var encerrar

var estadojogo=jogar

// 1 - Criar as Variantes SomMorte e SomSalto
var somMorte

var somSalto

//5 - CRIAR A VARIANTE PARA GAMEOUVER
var gameover

var gameoverImage


function preload(){
  trex_correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
 
  
  imagemdosolo = loadImage("ground2.png");
  
  imagemdanuvem = loadImage("cloud.png");
  
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  
  trexcolide=loadAnimation=("trex_collided.png")
  
  // 2 - Fazer o Preload dos SomMorte e SomSalto
  somSalto=loadSound("jump.mp3")
  somMorte=loadSound("die.mp3")
   
  
  //7 - Fazer o Preload do GameOver
  gameover_image=loadImage("gameOver.png")
  
  reiniciarimage=loadImage("restart.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_correndo);
 trex.addAnimation("collided", trexcolide);
  
  trex.scale = 0.5;
  
  solo = createSprite(200,180,400,20);
   solo.addImage("ground",imagemdosolo);
   solo.velocityX = -4;  
  
  soloinvisivel = createSprite(200,190,400,10);
  soloinvisivel.visible = false;
   
 grupodeobstaculos=createGroup()
  grupodenuvens=createGroup()
  
  
  //6 - Criar o Sprite do Game Over
  gameover=createSprite(300,100)
  
  //8 - Adiciona a Imagem ao Sprite Criado
  gameover.addImage(gameover_image)
  
  //9 - Colocar Scala para o Game Over
   gameover.scale=0.5
  
  //10 - Declarar que o Game Over tera sua visibilidade falsa
   gameover.visible=false
  
  reiniciar=createSprite(300,140)
  reiniciar.addImage(reiniciarimage)
  reiniciar.scale=0.5
  reiniciar.visible=false
   
}

function draw() {
  
  background(180);
 
if (estadojogo===jogar)  {

    
    
    //saltar quando a tecla de espaço é pressionada
    if((touches >0)keyDown("space")&& trex.y >= 100) {
       trex.velocityY = -13;
      //3 - Atribuir o SomSalto 
      somSalto.play()
      
  }
    
    
    if (solo.x < 0){
      solo.x = solo.width/2;
    }
    
  
    //adicionar gravidade
    trex.velocityY = trex.velocityY + 0.8
  
  //gerar as nuvens
    gerarNuvens();
  
    //gerar obstáculos no solo
    gerarObstaculos();
   
  if (grupodeobstaculos.isTouching(trex)){
    estadojogo=encerrar;
    
    //4 - Atribuir o SomMorte
    somMorte.play()
    
  }
}
  else if (estadojogo===encerrar){
    solo.velocityX=0
    trex.velocityY=0 
    
    //11-Declarar que o GAMEOVER tera sua visibilidade verdadeira.
    gameover.visible=true
    reiniciar.visible=true
    
    trex.changeAnimation("collided",trexcolide)
    grupodeobstaculos.setVelocityXEach(0);
    grupodenuvens.setVelocityXEach(0);
  
  
  if (mousePressedOver(reiniciar)){
    reset()
  }
    
}
  
  //evita que o Trex caia no solo
  trex.collide(soloinvisivel);

   
  
  
  
  
  
  drawSprites();
}

function gerarObstaculos(){
 if (frameCount % 60 === 0){
   var obstaculo = createSprite(400,165,10,40);
  obstaculo.velocityX = -6;
    obstaculo.scale = 0.5;
      
    //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstaculo.addImage(obstaculo1);
              break;
      case 2: obstaculo.addImage(obstaculo2);
              break;
      case 3: obstaculo.addImage(obstaculo3);
              break;
      case 4: obstaculo.addImage(obstaculo4);
              break;
      case 5: obstaculo.addImage(obstaculo5);
              break;
      case 6: obstaculo.addImage(obstaculo6);
              break;
      default: break;
    }
   
    
    grupodeobstaculos.add(obstaculo);
   
 }
}

function gerarNuvens() {
  //escreva o código aqui para gerar as nuvens 
  if (frameCount % 60 === 0) {
    nuvem = createSprite(600,100,40,10);
    
  
    
    nuvem.addImage(imagemdanuvem);
    nuvem.scale = 0.5;
    nuvem.velocityX = -3;
    
     
    //ajustando a profundidade
    nuvem.depth = trex.depth;
    trex.depth = trex.depth + 1;
   
    grupodenuvens.add(nuvem)
  }
}
function reset(){
  estadojogo=jogar
  gameover.visible=false
  reiniciar.visible=false
  
  // Destruir o ggrupodeObstaculos e Nuvens
  grupodeobstaculos.destroyEach()
  grupodenuvens.destroyEach()
}
