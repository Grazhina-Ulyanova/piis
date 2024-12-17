const canvas = document.getElementById('drawing-area');
const ctx = canvas.getContext('2d');
const shapeSelect = document.getElementById('shape-select');

let isDrawing = false;
let startX, startY;

canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    startX = event.offsetX;
    startY = event.offsetY;
});

canvas.addEventListener('mousemove', (event) => {
    if (!isDrawing) return;


    const currentX = event.offsetX;
    const currentY = event.offsetY;
    const shape = shapeSelect.value;

    if (shape === 'circle') {
        const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 20, 147, 0.5)';
        ctx.fill();

        ctx.closePath();
    } else if (shape === 'rectangle') {
        const width = currentX - startX;
        const height = currentY - startY;
        ctx.fillStyle = 'rgba(255, 20, 147, 0.5)';
        ctx.fillRect(startX, startY, width, height);
    } 
    
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('mouseleave', () => {
    isDrawing = false;
});
