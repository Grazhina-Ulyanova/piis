const productsContainer = document.getElementById("products");
let currentModal = null;

function createQuickViewModal(shirt){
    if (currentModal) {
        document.body.removeChild(currentModal);
        currentModal = null;
    }
    const modal = document.createElement('div');
        modal.id = 'quickViewModal';
        modal.classList.add('modal');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const closeModalButton = document.createElement('span');
        closeModalButton.id = 'closeModal';
        closeModalButton.classList.add('close');
        closeModalButton.innerHTML = 'Close';

        const modalFrontImage = document.createElement('img');
        modalFrontImage.id = 'modalFrontImage';
        modalFrontImage.alt = 'Front of T-shirt';

        const modalBackImage = document.createElement('img');
        modalBackImage.id = 'modalBackImage';
        modalBackImage.alt = 'Back of T-shirt';

        const modalPrice = document.createElement('p');
        modalPrice.id = 'modalPrice';

  
        modalContent.appendChild(closeModalButton);
        modalContent.appendChild(modalFrontImage);
        modalContent.appendChild(modalBackImage);
        modalContent.appendChild(modalPrice);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

     
        closeModalButton.addEventListener('click', closeModal);
        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                closeModal();
            }
        });

        currentModal  = modal;
  }



function openModal(shirt) {
   
    createQuickViewModal();

 
    const modal = document.getElementById('quickViewModal');
    const modalFrontImage = document.getElementById('modalFrontImage');
    const modalBackImage = document.getElementById('modalBackImage');
    const modalPrice = document.getElementById('modalPrice');

    
    modalFrontImage.src = shirt.colors.white ? shirt.colors.white.front : shirt.default.front;
    modalBackImage.src = shirt.colors.white ? shirt.colors.white.back : shirt.default.back;
    modalPrice.textContent = `Price: ${shirt.price}`;


    modal.style.display = 'block';
}


function closeModal() {
    const modal = document.getElementById('quickViewModal');
    modal.style.display = 'none';
}

function createCard(shirt){
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const shirtImage = document.createElement('img');
    const frontImage = shirt.colors.white ? shirt.colors.white.front : shirt.default.front;
    shirtImage.src = frontImage;
    productCard.appendChild(shirtImage);

    const name = document.createElement('h3');
    name.textContent = shirt.name;
    productCard.appendChild(name);

    const description = document.createElement('p');
    description.textContent = shirt.description || 'No description available';
    productCard.appendChild(description);

    const price = document.createElement('p');
    price.textContent = shirt.price;
    productCard.appendChild(price);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    
    const quickViewButton = document.createElement('button');
    quickViewButton.textContent = 'Quick View';
    buttonContainer.appendChild(quickViewButton);

    quickViewButton.addEventListener('click', () => openModal(shirt));

    const seePageButton = document.createElement('button');
    seePageButton.textContent = 'See Page';
    buttonContainer.appendChild(seePageButton);

    seePageButton.addEventListener('click', () => {
        localStorage.setItem('selectedShirt', shirt.name);
        window.location.href = 'details.html'; 
    });

 
    productCard.appendChild(buttonContainer);


    productsContainer.appendChild(productCard);

}

shirts.forEach(shirt => {createCard(shirt)});