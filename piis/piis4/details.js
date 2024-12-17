const shirtName = localStorage.getItem('selectedShirt');
const selectedShirt = shirts.find(shirt => shirt.name === shirtName);
const shirtDetailsContainer = document.getElementById('shirtDetails');
let currentColor = 'white';

shirtDetailsContainer.innerHTML = `
    <h2>${selectedShirt.name}</h2>
    <img src="${selectedShirt.colors.white.front}" alt="Front of ${selectedShirt.name}">
    <p>Price: ${selectedShirt.price}</p>
    <p>${selectedShirt.description}</p>
    <div id="frontBackOptions"></div>
    <div id="colorOptions"></div>
`;

const frontBackOptionsContainer = document.getElementById('frontBackOptions');
const colorOptionsContainer = document.getElementById('colorOptions');

const frontButton = document.createElement('button');
frontButton.textContent = 'Front';
frontButton.addEventListener('click', () => {
    document.querySelector('img[alt^="Front"]').src = selectedShirt.colors[currentColor].front;
});

const backButton = document.createElement('button');
backButton.textContent = 'Back';
backButton.addEventListener('click', () => {
    document.querySelector('img[alt^="Front"]').src = selectedShirt.colors[currentColor].back;
});

frontBackOptionsContainer.appendChild(frontButton);
frontBackOptionsContainer.appendChild(backButton);

Object.keys(selectedShirt.colors).forEach(color => {
    const button = document.createElement('button');
    button.textContent = color;
    button.addEventListener('click', () => {
        document.querySelector('img[alt^="Front"]').src = selectedShirt.colors[color].front;
        document.querySelector('img[alt^="Back"]').src = selectedShirt.colors[color].back;
        currentColor = color;
    });
    colorOptionsContainer.appendChild(button);
});


