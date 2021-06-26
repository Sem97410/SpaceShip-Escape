const canvas = document.getElementById('canvas');
const ctx= canvas.getContext('2d');
const img = new Image();
img.src = '../media/spaceShip-escape-set.png';

//general settings
let gamePlaying = false;        //toggle : je joue ou non ?
const gravity = .5;
const speed = 6.2;
const size = [33,49];           //Taille de l'oiseau (utilisé dans drawImage())
const jump = -11.5;
let cTenth = (canvas.height / 4);
const astSize = [50,48];


//Add mouvment 
// let actualPos = flyHeight;

function moveLeft(){
    cTenth += -1/20;
    if(cTenth <= 0){
        cTenth = 0;
    }
}
function moveRight(){
    cTenth += 1/20;
    if(cTenth >= 398){
        cTenth = 398;
    }
    
}



// asteroid settings
const astWidth = astSize[0];           //largeur poteau
const pipeGap = 270;            //ecart entre les poteaux 
const astLoc = () => (Math.random() * ((canvas.height - astSize[1]) - astSize[1])) + astSize[1];
                                //fonction qui va placer les poteaux au hasard et en générer.


let index = 0,
    bestScore = 0,
    currentScore = 0,
    astroids = [],
    flight,
    flyHeight;

const setup = () =>{            // Cette variable permet de remettre a 0 le jeux
    currentScore = 0;
    flight = jump;
    flyHeight = (canvas.height / 2) - (size[1] / 2);

    astroids = Array(3).fill().map((_a, i) => [canvas.height + (i * astSize[1]), astLoc()]);
                                // Pipes est composé de 2 elements. Element 1 : calcule du rapprochement des poteaux sur l'oiseau
                                // Element 2 : calcule de la hauteur de l'element (pour pas qu'ils soient tous allignés)
}                               

let render = () => {

/////////////////////FPS/////////////////////
window.countFPS = (function () {
    var lastLoop = (new Date()).getMilliseconds();
    var count = 1;
    var fps = 0;
  
    return function () {
      var currentLoop = (new Date()).getMilliseconds();
      if (lastLoop > currentLoop) {
        fps = count;
        count = 1;
      } else {
        count += 1;
      }
      lastLoop = currentLoop;
      return fps;
    };
  }());
  
  requestAnimationFrame(function () {
    console.log(countFPS());
  });
/////////////////////FPS/////////////////////
    index ++;

    //backGround
    ctx.drawImage(img, 0,0, canvas.width, canvas.height, 0, ((index *(speed)) % canvas.height) , canvas.width, canvas.height);   
    ctx.drawImage(img, 0,0, canvas.width, canvas.height, 0, ((index *(speed )) % canvas.height) - canvas.height, canvas.width, canvas.height);

    //Explication le drawImage va récupérer l'image de fond et la coller sur le canvas. Le modulo permettra de répéter la manoeuvre a chaque fois
    // et le fais de doubler le drawImage tout en enlevant le paramettre "+canvas.width" va permettre de créer un decallage dans le déplacement 
    //ce qui donnera l'impression que c'est continue alors que c'est deux images qui se suivent petit à petit

    if (gamePlaying){
      
        ctx.drawImage(img, 432, 0, ...size, cTenth, flyHeight, ...size); 
                                                //placer l'oiseau a gauche de l'ecran pour débuter le jeux
        flight += gravity;
        flyHeight = (canvas.height - size[1] - 30); 
                                                //l'ajouter du canvas.height ... permet en gros de bloquer l'oiseau en bas de l'écran

        
        window.addEventListener("keydown", function (event){
            switch (event.key) {
                case "ArrowLeft":
                moveLeft();
                 break;

                 case "ArrowRight":
                moveRight();
                 break;

            }
        }
        )

        astroids.map(asteroid => {
          

            asteroid[0] -= speed;

            function getRandomArbitrary(min, max) {
                return Math.random() * (max - min) + min;
              }
            
           test = 0;
            let astPosY = (index *(speed/1.5)) % canvas.height;

            //Asteroid
            ctx.drawImage(img, 432, 52, astWidth, astSize[1], 150, astPosY,   astWidth, astSize[1]);
            
            if (asteroid[0] <= -canvas.height){
                currentScore ++;
                bestScore = Math.max (bestScore, currentScore);

                //remove pipe + new pipe
                astroids = [...astroids.slice(1), [astroids[astroids.length-1][0] + pipeGap + astWidth, astLoc() ]];
                
                                //Quand un poteau sort a gauche on en regenere un autre a droite
            }
            ////////////////////////////////  PIPE GENERATION  //////////////////////////////////////////////////

            
            ////////////////////////////////  END GAME  //////////////////////////////////////////////////
            //if hit the pipe, end
            // if([
            //     pipe[0] <= cTenth + size[0],
            //     pipe[0] + pipeWidth >= cTenth, //SI l'oiseau se situe au niveau (Y) d'un poteau
            //     pipe[1] > flyHeight || pipe[1] + pipeGap < flyHeight + size[1] //On verifie si il est bien entre les deux
            // ].every (elem => elem)){        //Si il est pas entre les deux poteaux alors on arrete le jeux  et on relance

            //     gamePlaying = false;
            //     setup();
            // }

           
        })
    }else{
    ctx.drawImage(img, 434, 0, ...size, ((canvas.width / 2 ) - size[0] / 2), flyHeight,...size);                            
                                                //C'est lui qui va copier l'image original et l'ajouter sur le jeux                                           
    flyHeight = (canvas.height / 2) - (size[1] / 2);

    //interface visuelle (écriture)
    ctx.fillText(`Meilleur score : ${bestScore}`, 55, 245);
    ctx.fillText('Cliquez pour jouer', 48, 535);
    ctx.fillText('Pour vous déplacer utilsez les flèches gauche et droite', canvas.width / 2, 600, 331);
    ctx.font = "bold 30px courier";
    ctx.fillStyle = "white";
    
    }

        
    
    document.getElementById('bestScore').innerHTML = `Meilleur : ${bestScore}`;
    document.getElementById('currentScore').innerHTML = `Actuel : ${currentScore}`;

    window.requestAnimationFrame(render);       //Cette fonction va faire l'animation. 
                                                //En gros "index ++" va ajouter des valeurs et le
                                                //RequestAnimationFrame va recharger l'animation.

}



setup();
img.onload = render;                            //Au chargement de l'image, on lance le render
document.addEventListener('click', () => gamePlaying = true);
                                                //Fonction fléché, au click, gamePlayin passe a trou donc le jeux se lance


