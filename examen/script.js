const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const gameTimeElement = document.getElementById("game-time");

// Variables del juego
var dir = 0;
var t_x, t_y;
let walls = [];
var pause = false;
var speed = 1;
let startTime = null;
let currentTime = null;
let elapsedTime = 0;
let playerLife = 5; 
const maxPlayerLife = 5;
let playerOver = false;
let hasWon = false;

//Variables de imágenes.
let image = new Image();
image.src = "assets/patrulla.png";

let image2 = new Image();
image2.src = "assets/ladron.png";

let image3 = new Image();
image3.src = "assets/tope.png"

//Variables para el audio.
let audio = new Audio();
audio.src = "assets/musica-fondo.mp3";

audio.volume = 0.9;

let audio2 = new Audio();
audio2.src = "assets/choque.mp3";

let audio3 = new Audio();
audio3.src = "assets/musica-victoria.mp3";

const backgroundImage = new Image();
backgroundImage.src = "assets/laberinto.jpeg"; 

// Definimos la clase para crear nuestros objetos.
class Rectangulo {
    constructor(x, y, w, h, c) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
    }

    paint(ctx) {
        //ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.strokeRect(this.x, this.y, this.w, this.h);
    }

    seTocan(target) {
        if (this.x < target.x + target.w &&
            this.x + this.w > target.x &&
            this.y < target.y + target.h &&
            this.y + this.h > target.y) {
            return true;
        }
        return false;
    }
}

const player = new Rectangulo(30, 4, 20, 20, "blue");

// Crear obstáculos del laberinto
// Obstáculos horizontales.
walls.push(new Rectangulo(15, 20, 5, 560, "gray"));
walls.push(new Rectangulo(15, 578, 714, 4, "gray"));
walls.push(new Rectangulo(60, 20, 711, 4, "gray"));
walls.push(new Rectangulo(15, 103, 53, 2, "gray"));
walls.push(new Rectangulo(62, 73, 38, 2, "gray"));
walls.push(new Rectangulo(62, 132, 70, 2, "gray"));
walls.push(new Rectangulo(101, 103, 74, 2, "gray"));
walls.push(new Rectangulo(65, 160, 110, 2, "gray"));
walls.push(new Rectangulo(15, 188, 53, 2, "gray"));
walls.push(new Rectangulo(60, 244, 40, 2, "gray"));
walls.push(new Rectangulo(100, 215, 40, 2, "gray"));
walls.push(new Rectangulo(62, 298, 76, 2, "gray"));
walls.push(new Rectangulo(15, 329, 52, 2, "gray"));
walls.push(new Rectangulo(100, 329, 78, 2, "gray"));
walls.push(new Rectangulo(63, 356, 38, 2, "gray"));
walls.push(new Rectangulo(110, 383, 30, 2, "gray"));
walls.push(new Rectangulo(63, 412, 35, 2, "gray"));
walls.push(new Rectangulo(63, 466, 35, 2, "gray"));
walls.push(new Rectangulo(15, 494, 37, 2, "gray"));
walls.push(new Rectangulo(63, 522, 110, 2, "gray"));
walls.push(new Rectangulo(136, 47, 79, 2, "gray"));
walls.push(new Rectangulo(137, 76, 36, 2, "gray"));
walls.push(new Rectangulo(137, 187, 110, 2, "gray"));
walls.push(new Rectangulo(137, 271, 36, 2, "gray"));
walls.push(new Rectangulo(137, 355, 78, 2, "gray"));
walls.push(new Rectangulo(137, 467, 36, 2, "gray"));
walls.push(new Rectangulo(137, 494, 78, 2, "gray"));
walls.push(new Rectangulo(137, 550, 110, 2, "gray"));
walls.push(new Rectangulo(173, 243, 80, 2, "gray"));
walls.push(new Rectangulo(174, 299, 33, 2, "gray"));
walls.push(new Rectangulo(174, 411, 34, 2, "gray"));
walls.push(new Rectangulo(174, 439, 34, 2, "gray"));
walls.push(new Rectangulo(250, 48, 34, 2, "gray"));
walls.push(new Rectangulo(250, 76, 34, 2, "gray"));
walls.push(new Rectangulo(212, 103, 34, 2, "gray"));
walls.push(new Rectangulo(212, 159, 77, 2, "gray"));
walls.push(new Rectangulo(212, 271, 35, 2, "gray"));
walls.push(new Rectangulo(212, 383, 35, 2, "gray"));
walls.push(new Rectangulo(212, 522, 78, 2, "gray"));
walls.push(new Rectangulo(251, 131, 180, 2, "gray"));
walls.push(new Rectangulo(251, 215, 34, 2, "gray"));
walls.push(new Rectangulo(251, 298, 34, 2, "gray"));
walls.push(new Rectangulo(251, 355, 72, 2, "gray"));
walls.push(new Rectangulo(251, 466, 34, 2, "gray"));
walls.push(new Rectangulo(286, 103, 34, 2, "gray"));
walls.push(new Rectangulo(286, 187, 34, 2, "gray"));
walls.push(new Rectangulo(286, 243, 34, 2, "gray"));
walls.push(new Rectangulo(286, 271, 79, 2, "gray"));
walls.push(new Rectangulo(286, 327, 110, 2, "gray"));
walls.push(new Rectangulo(286, 494, 70, 2, "gray"));
walls.push(new Rectangulo(286, 550, 30, 2, "gray"));
walls.push(new Rectangulo(324, 48, 34, 2, "gray"));
walls.push(new Rectangulo(324, 215, 225, 2, "gray"));
walls.push(new Rectangulo(324, 383, 35, 2, "gray"));
walls.push(new Rectangulo(324, 522, 35, 2, "gray"));
walls.push(new Rectangulo(361, 76, 151, 2, "gray"));
walls.push(new Rectangulo(361, 104, 107, 2, "gray"));
walls.push(new Rectangulo(361, 187, 34, 2, "gray"));
walls.push(new Rectangulo(361, 243, 76, 2, "gray"));
walls.push(new Rectangulo(361, 299, 76, 2, "gray"));
walls.push(new Rectangulo(361, 355, 76, 2, "gray"));
walls.push(new Rectangulo(361, 467, 34, 2, "gray"));
walls.push(new Rectangulo(402, 160, 70, 2, "gray"));
walls.push(new Rectangulo(402, 383, 70, 2, "gray"));
walls.push(new Rectangulo(402, 411, 34, 2, "gray"));
walls.push(new Rectangulo(402, 494, 34, 2, "gray"));
walls.push(new Rectangulo(442, 187, 62, 2, "gray"));
walls.push(new Rectangulo(442, 271, 34, 2, "gray"));
walls.push(new Rectangulo(442, 438, 34, 2, "gray"));
walls.push(new Rectangulo(442, 466, 63, 2, "gray"));
walls.push(new Rectangulo(442, 522, 34, 2, "gray"));
walls.push(new Rectangulo(472, 132, 229, 2, "gray"));
walls.push(new Rectangulo(472, 243, 34, 2, "gray"));
walls.push(new Rectangulo(472, 355, 114, 2, "gray"));
walls.push(new Rectangulo(472, 411, 34, 2, "gray"));
walls.push(new Rectangulo(472, 494, 73, 2, "gray"));
walls.push(new Rectangulo(472, 550, 34, 2, "gray"));
walls.push(new Rectangulo(511, 271, 73, 2, "gray"));
walls.push(new Rectangulo(511, 299, 73, 2, "gray"));
walls.push(new Rectangulo(511, 383, 34, 2, "gray"));
walls.push(new Rectangulo(511, 439, 73, 2, "gray"));
walls.push(new Rectangulo(511, 522, 73, 2, "gray"));
walls.push(new Rectangulo(550, 76, 34, 2, "gray"));
walls.push(new Rectangulo(550, 159, 187, 2, "gray"));
walls.push(new Rectangulo(550, 550, 73, 2, "gray"));
walls.push(new Rectangulo(583, 215, 74, 2, "gray"));
walls.push(new Rectangulo(583, 327, 74, 2, "gray"));
walls.push(new Rectangulo(583, 383, 35, 2, "gray"));
walls.push(new Rectangulo(583, 467, 35, 2, "gray"));
walls.push(new Rectangulo(583, 495, 74, 2, "gray"));
walls.push(new Rectangulo(621, 76, 34, 2, "gray"));
walls.push(new Rectangulo(621, 271, 109, 2, "gray"));
walls.push(new Rectangulo(621, 439, 34, 2, "gray"));
walls.push(new Rectangulo(662, 48, 34, 2, "gray"));
walls.push(new Rectangulo(662, 187, 34, 2, "gray"));
walls.push(new Rectangulo(662, 243, 34, 2, "gray"));
walls.push(new Rectangulo(662, 299, 34, 2, "gray"));
walls.push(new Rectangulo(662, 410, 34, 2, "gray"));
walls.push(new Rectangulo(662, 466, 74, 2, "gray"));
walls.push(new Rectangulo(662, 550, 74, 2, "gray"));
walls.push(new Rectangulo(737, 48, 34, 2, "gray"));
walls.push(new Rectangulo(699, 75, 34, 2, "gray"));
walls.push(new Rectangulo(699, 215, 74, 2, "gray"));
walls.push(new Rectangulo(699, 355, 74, 2, "gray"));
walls.push(new Rectangulo(699, 383, 34, 2, "gray"));

// Obstáculos Verticales.
walls.push(new Rectangulo(62, 22, 3, 52, "gray"));
walls.push(new Rectangulo(62, 108, 3, 25, "gray"));



//Metas.
const target = new Rectangulo(740, 555, 30, 30, "red");

backgroundImage.onload = function() {
    // Dibujar la imagen de fondo en el canvas
    ctx.drawImage(backgroundImage, canvas.width, canvas.height);
};

// Evento para manejar las teclas
document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
        case 87:
            if (!pause) dir = e.keyCode;
            break;
        case 83:
            if (!pause) dir = e.keyCode;
            break;
        case 68:
            if (!pause) dir = e.keyCode;
            break;
        case 65:
            if (!pause) dir = e.keyCode;
            break;
        case 32:
            pause = !pause;
            break;
        case 82: 
        if (!hasWon) {
            // Solo permite el reinicio si no ha ganado
            resetGame();
        }
        break;
    }
});

// Función para actualizar el juego
function update() {
    audio.play();
    if (!pause && !playerOver) {
        //Inicializamos el tiempo de juego.
        currentTime = new Date();
        var elapsedTime = (currentTime - startTime) / 1000;
        gameTimeElement.textContent = elapsedTime.toFixed(1) + " s";

        switch (dir) {
            case 87:
                player.y -= speed;
                break;
            case 83:
                player.y += speed;
                break;
            case 68:
                player.x += speed;
                break;
            case 65:
                player.x -= speed;
                break;
        }
    }

    // Colisión con obstáculos
    for (var i = walls.length - 1; i >= 0; i--) {
        if (player.seTocan(walls[i])) {
            switch (dir) {
                case 87:
                    player.y += speed;
                    break;
                case 83:
                    player.y -= speed;
                    break;
                case 68:
                    player.x -= speed;
                    break;
                case 65:
                    player.x += speed;
                    break;
            }
            dir = 0;

            audio2.play();
            //Resta las vidas del jugador
            playerLife--;
            updatePlayerLife();

            //Verifica que el jugador haya agotado sus vidas para mostrar el Game Over.
            if (playerLife <= 0) {
                playerOver = true;
                gameOver();
            }
        }
    }

    // Verificar si el jugador llegó a alguna de las metas
    if (!hasWon && (player.seTocan(target))) {
        audio3.play();
        // Obtener el tiempo de juego actual
        const victoryTime = (currentTime - startTime) / 1000;
        document.getElementById("victory-time").textContent = victoryTime.toFixed(1);

        // Mostrar el mensaje de victoria
        document.getElementById("victory-message").classList.remove("hidden");
        pause = true; // Pausar el juego
        hasWon = true; // Establecer la bandera de victoria a true
    }

    repaint();
    window.requestAnimationFrame(update);
}

//Botón para reiniciar el juego.
document.getElementById("play-again-button").addEventListener("click", function () {
    document.getElementById("victory-message").classList.add("hidden");
    resetGame();
    hasWon = false; // Restablecer la bandera de victoria a false
    pause = false;
});

// Función para volver a pintar el canvas
function repaint() {
    if (!pause && !playerOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        //player.paint(ctx);
        ctx.drawImage(image, player.x, player.y, 20, 20);

        // Pintar obstáculos
        for (var i = walls.length - 1; i >= 0; i--) {
            ctx.drawImage(image3, walls[i].x, walls[i].y, walls[i].w, walls[i].h);
        }

        // Pintar puntos de meta.
        //target.paint(ctx);
        ctx.drawImage(image2, target.x, target.y, 30,30);

        //Evaluamos el tiempo de juego.
        if (!startTime) {
            startTime = performance.now();
        }
        currentTime = performance.now();
        elapsedTime = (currentTime - startTime) / 1000; // Tiempo en segundos.
      
    } else if (playerOver) {

    } else {
        // Pantalla de pausa
        ctx.fillStyle = "rgba(237, 233, 231 , 0.6)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = "50px Verdana";
        ctx.fontWeight = "Bold";
        ctx.fillStyle = "black";
        ctx.fillText("P A U S A", 275, 295);
    }
}

// Función para reiniciar el juego
function resetGame() {
    //Reiniciamos variables y repintamos el juego.
    player.x = 35;
    player.y = 4;
    dir = 0;
    startTime = new Date();
    gameTimeElement.textContent = "0.0 s";

    playerLife = maxPlayerLife;
    updatePlayerLife();
    playerOver = false;

    pause = false;

    repaint();
}

// Función para la barra de vida.
function updatePlayerLife() {
    const lifeBar = document.getElementById("player-life");
    const percentage = (playerLife / maxPlayerLife) * 100;
    lifeBar.style.width = percentage + "%";
}

// Función para visualizar la pantalla Game Over.
function gameOver() {
    playerOver = true;
    pause = true;
    ctx.fillStyle = "rgba(237, 233, 231, 0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "50px Verdana";
    ctx.fontWeight = "Bold";
    ctx.fillStyle = "black";
    ctx.fillText("GAME OVER", 250, 295);
}

// Iniciar el juego y calcular el tiempo de carga
startTime = new Date();
window.requestAnimationFrame(update);