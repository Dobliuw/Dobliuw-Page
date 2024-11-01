// script.js
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

// Fix the canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 0s and 1s characters
const characters = "01";
const fontSize = 20;
const columns = canvas.width / fontSize; // Número de columnas en pantalla

// Array for Rain Effect
const drops = Array(Math.floor(columns)).fill(1);

// Draw hack effect
function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(255, 255, 255, 0.3)"; 
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, index) => {
        const text = characters[Math.floor(Math.random() * characters.length)];
        const x = index * fontSize;
        
        ctx.fillText(text, x, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[index] = 0;
        }

        drops[index]++;
    });
}

// Execute the effect in a loop
setInterval(drawMatrix, 50);

// Resize the canvas if the windows size change
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
