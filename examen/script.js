const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const gameTimeElement = document.getElementById("game-time");

// Variables del juego
var dir = 0;
var t_x, t_y;
let walls = [];
var pause = false;
var speed = 2;
let startTime = null;
let currentTime = null;
let elapsedTime = 0;
let playerLife = 5; 
const maxPlayerLife = 5;
let playerOver = false;



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
        ctx.fillStyle = this.c;
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

const player = new Rectangulo(10, 10, 30, 30, "blue");

// Crear obstáculos del laberinto
walls.push(new Rectangulo(10, 100, 10, 200, "gray"));
walls.push(new Rectangulo(100, 300, 200, 10, "gray"));
walls.push(new Rectangulo(200, 100, 10, 200, "gray"));
walls.push(new Rectangulo(200, 200, 200, 10, "gray"));
walls.push(new Rectangulo(300, 100, 10, 200, "gray"));
walls.push(new Rectangulo(300, 300, 10, 100, "gray"));
walls.push(new Rectangulo(400, 100, 10, 200, "gray"));

//Metas.
const target = new Rectangulo(540, 540, 30, 30, "red");
const target2 = new Rectangulo(540, 50, 30, 30, "red");

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
            resetGame();
            break;
    }
});

// Función para actualizar el juego
function update() {
    if (!pause && !playerOver) {
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

            playerLife--;
            updatePlayerLife();

            if (playerLife <= 0) {
                playerOver = true;
                gameOver();
            }
        }
    }

    // Verificar si el jugador llegó a alguna de las metas
    if (player.seTocan(target) || player.seTocan(target2)) {
        alert("¡Has ganado!");
        resetGame();
    }

    repaint();
    window.requestAnimationFrame(update);
}

// Función para volver a pintar el canvas
function repaint() {
    if (!pause && !playerOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Pintamos al jugador con un color fijo
        player.c = "blue";
        player.paint(ctx);

        // Pintar obstáculos
        for (var i = walls.length - 1; i >= 0; i--) {
            walls[i].paint(ctx);
        }

        // Pintar puntos de meta.
        target.paint(ctx);
        target2.paint(ctx);

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
        ctx.fillText("P A U S A", 285, 295);
    }
}

// Función para reiniciar el juego
function resetGame() {
    player.x = 10;
    player.y = 10;
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