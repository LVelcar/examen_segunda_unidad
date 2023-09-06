const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const loadTimeElement = document.getElementById("load-time");
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

const player = new Rectangulo(50, 50, 30, 30, "blue");
const target = new Rectangulo(540, 540, 30, 30, "red");

// Crear obstáculos del laberinto
walls.push(new Rectangulo(100, 100, 30, 200, "gray"));
walls.push(new Rectangulo(100, 300, 200, 30, "gray"));
walls.push(new Rectangulo(200, 100, 30, 200, "gray"));
walls.push(new Rectangulo(200, 200, 100, 30, "gray"));
walls.push(new Rectangulo(300, 100, 30, 200, "gray"));
walls.push(new Rectangulo(300, 300, 30, 100, "gray"));
walls.push(new Rectangulo(400, 100, 30, 200, "gray"));

// Puntos de inicio y meta adicionales
const start1 = new Rectangulo(50, 50, 30, 30, "green");
const start2 = new Rectangulo(50, 540, 30, 30, "green");
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
    }
});

// Función para actualizar el juego
function update() {
    if (!pause) {
        currentTime = new Date();
        var elapsedTime = (currentTime - startTime) / 1000;
        gameTimeElement.textContent = elapsedTime.toFixed(2) + " s";

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
        }
    }

    // Cambiar posición de la meta si se alcanza
    if (player.seTocan(target)) {
        t_x = Math.random() * (canvas.width - target.w);
        t_y = Math.random() * (canvas.height - target.h);
        target.x = t_x;
        target.y = t_y;
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
    if (!pause) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Pintamos al jugador con un color fijo
        player.c = "blue";
        player.paint(ctx);

        // Pintar obstáculos
        for (var i = walls.length - 1; i >= 0; i--) {
            walls[i].paint(ctx);
        }

        // Pintar puntos de inicio y meta
        start1.paint(ctx);
        start2.paint(ctx);
        target.paint(ctx);
        target2.paint(ctx);

        if (!startTime) {
            startTime = performance.now();
        }
        currentTime = performance.now();
        elapsedTime = (currentTime - startTime) / 1000; // Tiempo en segundos.

    } else {
        // Pantalla de pausa
        ctx.fillStyle = "rgba(154, 160, 154, 0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = "30px Verdana";
        ctx.fillStyle = "black";
        ctx.fillText("P A U S A", 180, 270);
    }
}

// Función para reiniciar el juego
function resetGame() {
    player.x = 50;
    player.y = 50;
    dir = 0;
    startTime = new Date();
    gameTimeElement.textContent = "0.00 s";
}

// Función para calcular el tiempo de carga
function calculateLoadTime() {
    const endTime = new Date();
    const loadTime = (endTime - startTime) / 1000; // Tiempo en segundos
    loadTimeElement.textContent = loadTime.toFixed(2);
}

// Iniciar el juego y calcular el tiempo de carga
startTime = new Date();
window.requestAnimationFrame(update);
calculateLoadTime();
