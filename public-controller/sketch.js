//Create the socket
let socket = io();


let screenPlayer;
let imgFondo0;
let imgFondo1;
let imgFondo2;
let imgFondo3;
let imgFondo4;
let imgFondo5;
let imgFondo6;
let imgArrows;

//Botones
let opacity;
let overButon = false;
let r;
let g;
let b;

let nameInput;
let lastnameInput;
let emailInput;

let canvas;


function preload() {
    //Imagenes de fondo
    imgFondo0 = loadImage("data/fondo0.png");
    imgFondo1 = loadImage("data/fondo1.png");
    imgFondo2 = loadImage("data/fondo2.png");
    imgFondo3 = loadImage("data/fondo3.png");
    imgFondo4 = loadImage("data/fondo4.png");
    imgFondo5 = loadImage("data/fondo5.png");
    imgFondo6 = loadImage("data/fondo6.png");
    imgArrows = loadImage("data/arrows.png");
}



function setup() {
    frameRate(16);
    canvas = createCanvas(390, 844);
    screenPlayer = 0;
    opacity = 255;
    r = 33;
    g = 228;
    b = 48;
    lifeCount = 60;

    nameInput = createInput('');
    nameInput.position(34.36, 306.77);
    nameInput.size(325, 54);
    nameInput.input(myInputEventName);

    lastnameInput = createInput('');
    lastnameInput.position(34.36, 411.1);
    lastnameInput.size(325, 54);
    lastnameInput.input(myInputEventNameLastName);

    emailInput = createInput('');
    emailInput.position(34.36, 515.43);
    emailInput.size(325, 54);
    emailInput.input(myInputEmailName);
}

function windowResized() {
    canvas = resizeCanvas(windowWidth, windowHeight);
}



function draw() {
    background(0);


    switch (screenPlayer) {
        case 0: //Start game?
            image(imgFondo1, 0, 0);
            nameInput.style('display', 'none');
            lastnameInput.style('display', 'none');
            emailInput.style('display', 'none');

            //Boton Instructions
            noStroke();
            fill(255);
            rect(36.72, 661.28, 322.28, 42.31, 10);
            fill(0);
            textFont('Poppins');
            textSize(16);
            text('Instructions', 152.81, 689);

            //Boton Start game
            noStroke();
            fill(r, g, b);
            rect(36.72, 710.42, 322.28, 42.31, 10);
            fill(0);
            textFont('Poppins');
            textSize(16);
            text('Start Game', 152.81, 737);
            break;

        case 1: //Controllers
            image(imgFondo2, 0, 0);
            movementButton('LEFT', 74.92, 422);
            movementButton('RIGHT', 314, 422);
            movementButton('DOWN', 195, 536, 82);
            movementButton('UP', 195, 296.86);
            nameInput.style('display', 'none');
            lastnameInput.style('display', 'none');
            emailInput.style('display', 'none');

            image(imgArrows, 0, 0);

            break;

        case 2: //Want to sign?
            image(imgFondo3, 0, 0);


            //Yes
            noStroke();
            fill(r, g, b);
            rect(36.72, 661.28, 322.28, 42.31, 10);
            fill(0);
            textFont('Poppins');
            textSize(16);
            text('Yes', width / 2, 689);

            //No
            noStroke();
            fill(255);
            rect(36.72, 710.42, 322.28, 42.31, 10);
            fill(0);
            textFont('Poppins');
            textSize(16);
            text('No', width / 2, 737);
            nameInput.style('display', 'none');
            lastnameInput.style('display', 'none');
            emailInput.style('display', 'none');
            break;

        case 3: //Sign up petition 
            image(imgFondo4, 0, 0);

            //Sign petition button
            noStroke();
            fill(r, g, b);
            rect(36.72, 710.42, 322.28, 42.31, 10);
            fill(0);
            textFont('Poppins');
            textSize(16);
            text('Sign petition', 149.09, 737);

            nameInput.style('display', 'block');
            lastnameInput.style('display', 'block');
            emailInput.style('display', 'block');
            break;

        case 4:
            //Check signed (Email confirmation)
            image(imgFondo5, 0, 0);
            nameInput.style('display', 'none');
            lastnameInput.style('display', 'none');
            emailInput.style('display', 'none');
            break;

        case 5: ///Don't want to sign (Thanks for playing)
            image(imgFondo6, 0, 0);
            nameInput.style('display', 'none');
            lastnameInput.style('display', 'none');
            emailInput.style('display', 'none');
            break;

        case 6: //Start game after instructions
            image(imgFondo0, 0, 0);

            //Start game button
            noStroke();
            fill(r, g, b);
            rect(36.72, 710.42, 322.28, 42.31, 10);
            fill(0);
            textFont('Poppins');
            textSize(16);
            text('Start game', 152.81, 737);

            nameInput.style('display', 'none');
            lastnameInput.style('display', 'none');
            emailInput.style('display', 'none');
            break;

    }
}

function movementButton(direction, posX, posY) {
    noStroke();
    fill(255, 255, 255, 100);
    ellipse(posX, posY, 90, 90);
    if (dist(pmouseX, pmouseY, posX, posY) < 50) {
        socket.emit('directions', direction);
        opacity = 50;
    }
};

function changeScreen(screenNumber) {
    socket.emit('screens', screenNumber);
}

function keyPressed() { //REVISAR ESTO
    if (keyCode === RETURN) {
        // myInputEventName();
    }
}

function myInputEventName() { //REVISAR ESTO
    this.value();
}

function myInputEventNameLastName() { //REVISAR ESTO
    this.value();
}

function myInputEmailName() { //REVISAR ESTO
    this.value();
}


function mousePressed() {

    switch (screenPlayer) {

        case 0: //Start game?

            if (mouseX > 36.72 && mouseX < 358.92 &&
                mouseY > 661.28 && mouseY < 661.8 + 42.31) {
                console.log('presionado');
                screenPlayer = 6;
                changeScreen(0);
            } else if (mouseX > 36.72 && mouseX < 358.92 &&
                mouseY > 710.42 && mouseY < 752.76) {
                console.log('presionado');

                screenPlayer = 1;
                changeScreen(3);
            }

            break;

        case 1: //Controllers

            break;

        case 2: //Want to sign up?

            //Yes
            if (mouseX > 36.72 && mouseX < 358.92 &&
                mouseY > 661.28 && mouseY < 661.8 + 42.31) {
                console.log('presionado');
                screenPlayer = 3;

                //No
            } else if (mouseX > 48.72 && mouseX < 364.59 &&
                mouseY > 710.42 && mouseY < 752.76) {
                screenPlayer = 5;
                changeScreen(1);

            }
            break;

        case 3: //Sign petition
            if (mouseX > 48.72 && mouseX < 364.59 &&
                mouseY > 710.42 && mouseY < 752.76) {
                console.log('Sign petition presionado');
                screenPlayer = 4;
                changeScreen(2);
            }
            break;

        case 4:
            break;
        case 5:
            break;

        case 6:
            if (mouseX > 48.72 && mouseX < 364.59 &&
                mouseY > 710.42 && mouseY < 752.76) {
                screenPlayer = 1;
                changeScreen(3);
            }
            break;



    }

}

socket.on('screensController', (pantalla) => {

    switch (pantalla) {
        case 0:
            screenPlayer = 2;
            console.log('Pantalla', screenPlayer);
            break;

    }
});