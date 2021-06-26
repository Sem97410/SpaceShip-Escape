
//General settings

const canvas = document.getElementById('canvas');
const ctx= canvas.getContext('2d');
const img = new Image();
let index = 0;
const speed = 6.2;
img.src = '../media/spaceShip-escape-set.png';

let gamePlaying = false; 



var vaisseau = {
  posX : 250,
  posY : 250,
  largeur : 33,
  vitesse : 49
}

var asteroid = {
 posX : 0,
 posY : 0,
 largeur : 100,
 hauteur : 100,
 vitesse : 30
}

///////////////////////////////////////////
///////////////////////////////////////////

//Background
function drawBackground() {
  index++;
  ctx.drawImage(img, 0,0, canvas.width, canvas.height, 0, ((index *speed) % canvas.height) , canvas.width, canvas.height);   
  ctx.drawImage(img, 0,0, canvas.width, canvas.height, 0, ((index *speed) % canvas.height) - canvas.height, canvas.width, canvas.height);


}

//fonction dessin
function draw(){
  drawBackground();
  //vaisseau
  //asteroid
  //background

 

}


///////////////////////////////////////////
///////////////////////////////////////////


function render(){
  //Refresh coordonné
  //SI gameplaying = VRAI 
  // => coordonnée vaisseau en bas de l'ecran
  //Appelle function draw()
  //Coordonnée asteroid en haut de l'ecran
  //Sinon on appelle "DrawAccueil"
  draw();
  requestAnimationFrame(render); // A verifier les parentheses
}

img.onload = render();  





//function setShipPos(){
// positionY += 75%
//PositionX += 50%
//}




function moveLeft(){
  positionY += -1;
  if(positionY <= 0){
    positionY = 0;
  }
}
function moveRight(){
  positionX += 1;
  if(positionX >= 398){
      positionX = 398;
  }
  
}

window.addEventListener("keydown", function (event){
  switch (event.key) {
      case "ArrowLeft":
      moveLeft();
       break;

       case "ArrowRight":
      moveRight();
       break;

  }
})

document.addEventListener('click', () => gamePlaying = true);