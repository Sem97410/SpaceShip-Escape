
//General settings

const canvas = document.getElementById('canvas');
const ctx= canvas.getContext('2d');
const img = new Image();
let index = 0;
const speed = 6.2;
img.src = '../media/spaceShip-escape-set.png';
let bestScore = 0;

let gamePlaying = false; 



var ship = {
  width : 33,
  height : 49,
  vitesse : 49,
  posX : 0,  
  posY : 0 

}

var asteroid = {
 posX : 0,
 posY : 0,
 width : 50,
 height : 48,
 vitesse : 30
}

///////////////////////////////////////////
//////////////////Draw/////////////////////

//Background
function drawBackground() {
  index++;
  ctx.drawImage(img, 0,0, canvas.width, canvas.height, 0, ((index *speed) % canvas.height) , canvas.width, canvas.height);   
  ctx.drawImage(img, 0,0, canvas.width, canvas.height, 0, ((index *speed) % canvas.height) - canvas.height, canvas.width, canvas.height);
}

//Ship
function drawShip(){
  ctx.drawImage(img, 434, 0, ship.width, ship.height, ((canvas.width / 2 ) - (ship.width / 2)), ship.posY,ship.width, ship.height);  
}

//asteroid
function drawAst(){
  ctx.drawImage(img,432, 52, asteroid.width, asteroid.height, asteroid.posX, asteroid.posY, asteroid.width, asteroid.height)
}
//Home writings
function drawWriting(){
  ctx.fillText(`Meilleur score : ${bestScore}`, 55, 245);
  ctx.fillText('Cliquez pour jouer', 48, 535);
  ctx.fillText('Pour vous déplacer utilsez les flèches gauche et droite', 48, 600, 350);
  ctx.font = "bold 30px courier";
  ctx.fillStyle = "white";
}

//General draw
function generalDraw(){
  drawBackground();
  
}


//fonction dessin
function draw(){
 
  drawShip();

  
}

///////////////////////////////////////////
///////////////Animation///////////////////

function moveLeft(){
  console.log("fleche gauche enfoncé");
  ship.posX += -20;
  if(ship.posX <= 0){
    ship.posX = 0;
  }
}
function moveRight(){
  console.log("fleche droite enfoncé");
  ship.posX += 20;
  if(ship.posX >= 398){
    ship.posX = 398;
  }
}




function render(){
  generalDraw();

  if(gamePlaying){

    //Ship position
    ship.posX = (canvas.width / 2 ) - (33 / 2);
    ship.posY = (canvas.height /6) * 5 ;

    //asteroid
    drawAst();

    //movment
    window.addEventListener("keydown", function (event){
      switch (event.key) {
          case "ArrowLeft":
          moveLeft();
          drawShip();
           break;
    
           case "ArrowRight":
          moveRight();
          drawShip();
           break;
    
      }
    })
    
  }else{

    //Ship position
    ship.posX = (canvas.width / 2 ) - (33 / 2);
    ship.posY = (canvas.height / 2) - (49/2);

    //Home
    drawWriting();

    //Writtings
    

  }
    

  


  //SI gameplaying = VRAI 
  // => coordonnée vaisseau en bas de l'ecran
  //Appelle function draw()
  //Coordonnée asteroid en haut de l'ecran
  //Sinon on appelle "DrawAccueil"
  draw();
  requestAnimationFrame(render); // A verifier les parentheses
}

img.onload = render();  






document.addEventListener('click', () => gamePlaying = true);