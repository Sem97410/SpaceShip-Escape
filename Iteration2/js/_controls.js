///////////////////////////////////////////
///////////////controls///////////////////

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
  
///////////////////////////////////////////
//////////////////Draw/////////////////////