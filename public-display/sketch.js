//Create the socket
let socket = io();
let screenDisplay;

//Turtle
let lifeCount;
let imgLife;
let imgTurtle;
let x;
let y;

//Obstaculos
let obstacles = [];
let imgObstaculo1;
let imgObstaculo2;
let imgObstaculo3;
let imgObstaculo4;
let imgObstaculo5;


//Imagenes pantallas
let imgInstrucciones;
let imgGanar;
let imgPerder;
let imgThanks;
let imgPrize;
let imgJuego;
let imgFondo0;

let character = {
    x: 0,
    y: 0,
    lifes: 3

};
let speed = 5;

function preload() {
    //Imagenes de fondo
    imgFondo0 = loadImage("data/fondo0.gif");
    imgInstrucciones = loadImage("data/instrucciones.png");
    imgGanar = loadImage("data/Ganar.png");
    imgPerder = loadImage("data/Perder.png");
    imgThanks = loadImage("data/Thanks.png");
    imgPrize = loadImage("data/Prize.png");
    imgJuego = loadImage("data/Juego.png");

    //Turtle
    imgTurtle = loadImage("data/turtle.gif");
    imgLife = loadImage("data/life.png");

    //Obstaculos
    imgObstaculo1 = loadImage("data/Obstaculo1.png");
    imgObstaculo2 = loadImage("data/Obstaculo2.png");
    imgObstaculo3 = loadImage("data/Obstaculo3.png");
    imgObstaculo4 = loadImage("data/Obstaculo4.png");
    imgObstaculo5 = loadImage("data/Obstaculo1.png");
}

function setup() {
    screenDisplay = 0;
  //  frameRate(60);
    createCanvas(600, 766);
    character.x = 300;
    character.y = 730;
    lifeCount = 60;

    //Enemigos
     obstacles.push(new Obstacle (imgObstaculo1, 73.77, 203.24));
     obstacles.push(new Obstacle (imgObstaculo2, 531.39, 312.24));
     obstacles.push(new Obstacle (imgObstaculo3, 73.77, 421.24));
     obstacles.push( new Obstacle (imgObstaculo4, 531.39, 530.24));
     obstacles.push(new Obstacle   (imgObstaculo5, 73.7, 639.24));

        
  
     }
    
function draw() {
    background(0);

    if (lifeCount > 0) {
        lifeCount--;
    }

   
    switch (screenDisplay) {


        case 0: //QR screen
            image(imgFondo0, 0,0);
            break;

        case 1: //How to play COLOCAR UN CONTADOR
            image(imgInstrucciones, 0, 0);
            
            break;

        case 2: //Game screen
           image(imgJuego, 600/2, 766/2);
            fill(255);
            noStroke();
            imageMode(CENTER);
            image(imgTurtle, character.x, character.y);

            showLifes();

            for (let i = 0; i < obstacles.length; i++) {
                obstacles[i].paint();
               obstacles[i].move();
               
                
              }
              hits();

            //Limites
            if (character.y >= 766) {
                character.y = 766;
            }

            if (character.x < 0) {
                character.x = 0;
            }

            if (character.x > 600) {
                character.x = 600;
            }

            //Superficie
            if (character.y <= 0) {
                screenDisplay = 3;
                changeScreen(0);
            }
            break;
        case 3: //Winner screen
            image(imgGanar,600/2, 766/2);
            break;

        case 4: //Game over screen
            image(imgPerder, 600/2, 766/2);
            break;

        case 5: //Thanks - no sign
            image(imgThanks, 600/2, 766/2);
            console.log('Gracias, no quieres firmar');
            break;

        case 6: //Claim prize
            image(imgPrize, 600/2, 766/2);
            console.log('Claim prize');
            break;
    }
}

function paintObstacles(refImage){
   image(refImage, x, y);


}

function hits() {

    for (let i = 0; i < obstacles.length; i++) {
        const element = obstacles[i];
        let obstacleX = element.getX();
        let obstacleY = element.getY();
        if ((dist(character.x, character.y, obstacleX, obstacleY) < 98) && lifeCount === 0) {
            
            character.lifes = character.lifes - 1;
            lifeCount = 60;
            console.log('Impacto');

            if (character.lifes === 0) {
                screenDisplay = 4;
                changeScreen(0);
            }
        }
    }
}

function showLifes() {

    for (let i = 0; i < character.lifes; i++) {
        image(imgLife, 27.05 + (i * 30),103);
    }
}

function changeScreen(screenNumber) { //revisar esto
    socket.emit('screensController', screenNumber);
}

//REVISAR ESTO
socket.on('screens', (pantalla) => {

    switch (pantalla) {
        case 0:
            screenDisplay = 1;
            break;

        case 1:
            screenDisplay = 5;
            break;

        case 2:
            screenDisplay = 6;
            break;
            case 3:
                screenDisplay = 2;
            break;
        case 3:
            screenDisplay = 2;
    }
})


socket.on('directions', (controllerOrder) => {
    console.log(controllerOrder);
    switch (controllerOrder) {
        case 'UP':
            character.y -= speed;
            break;
        case 'DOWN':
            character.y += speed;
            break;
        case 'RIGHT':
            character.x += speed;
            break;
        case 'LEFT':
            character.x -= speed;
    }
})