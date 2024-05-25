// Get elements
const fundsText = document.getElementById('funds');
const cartButton = document.querySelector('.cart-button');
const cartBadge = document.querySelector('.cart-badge');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.close');
const buyButton = document.querySelector('.buy-btn');
const cartItemsList = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const itemsGrid = document.querySelector('.items-grid');

let walletAmount = 60;
let cart = [];
let total = 0;

let items = [
    {
        id: 1,
        name: 'Apple',
        price: 1,
    },
    {
        id: 2,
        name: 'Banana',
        price: 10,
    },
    {
        id: 3,
        name: 'Avocado',
        price: 16,
    },
    {
        id: 4,
        name: 'Shoes',
        price: 165,
    },
    {
        id: 5,
        name: 'Cake',
        price: 35,
    },
    {
        id: 6,
        name: 'Milk',
        price: 5,
    },
    {
        id: 7,
        name: 'Eggs',
        price: 21,
    },
    {
        id: 8,
        name: 'Bread',
        price: 12,
    },
];


// An example function that creates HTML elements using the DOM.
function fillItemsGrid() {
    for (const item of items) {
        let itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img width=200 height=auto src="./img/${item.id}.jpg" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
        `;
        itemsGrid.appendChild(itemElement);
    }
}

// Adding the .show-modal class to an element will make it visible
// because it has the CSS property display: block; (which overrides display: none;)
// See the CSS file for more details.
function toggleModal() {
  modal.classList.toggle('show-modal');
}

function toggleModalAndShowCart() {
    modal.classList.toggle('show-modal');
    showCart();
}

function removeItem(id) {
    const selectedID = cart.findIndex(item => item.id == id);
    if (selectedID !== -1){
        const removed = cart[selectedID];
        cart.splice(selectedID, 1);
        cartBadge.textContent = cart.length;
        total -= removed.price;
        showCart();
    }
}

function showCart() {
    cartItemsList.innerHTML = '';
    const itemAmounts = {};
    cart.forEach(item => {
        const id = item.id;
        itemAmounts[id] = (itemAmounts[id] || 0) + 1;
    })

    for (const [id, amount] of Object.entries(itemAmounts)){
        const item = items.find(item => item.id == id);
        if(item){
            const li = document.createElement('li');
            li.textContent = `${item.name} - Amount: ${amount} - $${(item.price * amount)}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                removeItem(id);
            })
            li.appendChild(deleteButton);
            cartItemsList.appendChild(li);
        }
    }
    cartTotal.textContent = `$${total}`;
}

function shoppingDone() {
    cart = [];
    cartBadge.textContent = 0;
    total = 0;
    toggleModal();
}

function checkFunds() {
    fundsText.textContent = walletAmount;
}

checkFunds();
// Call fillItemsGrid function when page loads
fillItemsGrid();

const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

// Example of DOM methods for adding event handling
cartButton.addEventListener('click', toggleModalAndShowCart);
modalClose.addEventListener('click', toggleModal);
buyButton.addEventListener('click', checkout)
addToCartButtons.forEach((button) => {
    button.addEventListener('click', function (event) {
        const id = event.target.dataset.id;
        console.log(id);
        add(id);
    })
})

function add(id) {
    const item = items.find((item) => item.id == id);
    if(item){
        cart.push(item);
        total += item.price;
        cartBadge.textContent = cart.length;
        console.log(`Adding ${item.name} to cart with price ${item.price}.`);
    }
    else {
        console.log(`Item '${item}' not found in the store.`);
        return;
    }
}


function checkout() {
    if(total <= walletAmount && total > 0){
        console.log(`Buying all products from cart with total: ${total}`);
        alert(`Buying all products from cart with total: ${total}`);
        walletAmount = walletAmount - total;
        checkFunds();
        shoppingDone();
        console.log(`New wallet balance: ${walletAmount}`);
        alert(`New wallet balance: ${walletAmount}`);
    }
    else if(total == 0){
        console.log("Your cart is empty.");
        alert("Your cart is empty.");
    }
    else {
        console.log('Your cart total is bigger than wallet balance.');
        alert('Your cart total is bigger than wallet balance.');
    }
}


