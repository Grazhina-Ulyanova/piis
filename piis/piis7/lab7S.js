const svg = document.getElementById('drawing-area');
const shapeSelect = document.getElementById('shape-select');

let isDrawing = false;
let startX, startY;

svg.addEventListener('mousedown', (event) => {
    isDrawing = true;
    startX = event.offsetX;
    startY = event.offsetY;
});

svg.addEventListener('mousemove', (event) => {
    if (!isDrawing) return;

    const currentX = event.offsetX;
    const currentY = event.offsetY;

   
     

    const shape = shapeSelect.value;
    if (shape === 'circle') {
        const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', startX);
        circle.setAttribute('cy', startY);
        circle.setAttribute('r', radius);
        circle.setAttribute('fill', 'rgba(255, 20, 147, 0.5)');
        svg.appendChild(circle);
    } else if (shape === 'rectangle') {
        const width = currentX - startX;
        const height = currentY - startY;
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', startX);
        rect.setAttribute('y', startY);
        rect.setAttribute('width', width);
        rect.setAttribute('height', height);
        rect.setAttribute('fill', 'rgba(255, 20, 147, 0.5)');
        svg.appendChild(rect);
    }
   
});

svg.addEventListener('mouseup', () => {
    isDrawing = false;
});

svg.addEventListener('mouseleave', () => {
    isDrawing = false;
});
