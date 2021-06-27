//General settings

const canvas = document.getElementById('canvas');
const ctx= canvas.getContext('2d');

let index = 0;
const speed = 6.2;

let bestScore = 0;
let gamePlaying = false; 

const img = new Image();
img.src = '../media/spaceShip-escape-set.png';

// objects custom
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
