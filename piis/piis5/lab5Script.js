
let isDragging = false;
let isSticky = false;
let offsetX, offsetY;
let currentElement = null;
let originalPosition = { top: 0, left: 0 };



document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('.target');

    targets.forEach(target => {
        target.addEventListener('mousedown', (event) => {
            if (isSticky) return;
            isDragging = true;
            currentElement = target;
            originalPosition.top = currentElement.style.top;
            originalPosition.left = currentElement.style.left;
            offsetX = event.clientX - target.getBoundingClientRect().left;
            offsetY = event.clientY - target.getBoundingClientRect().top;
        });
        target.addEventListener('click', () => {
            if (isSticky && currentElement === target) {
                isSticky = false
                currentElement.style.backgroundColor = 'red';
                currentElement = null;
            }
        });
        target.addEventListener('dblclick', () => {
            isSticky = true;
            if (currentElement !== target) {
                currentElement = target;
                originalPosition.top = target.style.top;
                originalPosition.left = target.style.left;
            }
            target.style.backgroundColor = 'blue';
        });
    });


    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && currentElement) {

            currentElement.style.top = originalPosition.top;
            currentElement.style.left = originalPosition.left;
            isDragging = false;
            isSticky = false;
            currentElement.style.backgroundColor = 'red';
            currentElement = null;
        }
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging && currentElement) {
            currentElement.style.left = (event.clientX - offsetX) + 'px';
            currentElement.style.top = (event.clientY - offsetY) + 'px';
        } else if (isSticky && currentElement) {
            currentElement.style.left = (event.clientX - offsetX) + 'px';
            currentElement.style.top = (event.clientY - offsetY) + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            currentElement = null;
        }
    });

})
