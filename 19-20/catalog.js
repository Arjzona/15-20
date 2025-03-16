const products = [
    {"id": 1, "name": "Товар 1", "price": 100},
    {"id": 2, "name": "Товар 2", "price": 200},
    {"id": 3, "name": "Товар 3", "price": 300},
    {"id": 4, "name": "Товар 4", "price": 400},
    {"id": 5, "name": "Товар 5", "price": 500},
    {"id": 6, "name": "Товар 6", "price": 600},
    {"id": 7, "name": "Товар 7", "price": 700},
    {"id": 8, "name": "Товар 8", "price": 800},
    {"id": 9, "name": "Товар 9", "price": 900},
    {"id": 10, "name": "Товар 10", "price": 1000}
];

function displayCatalog() {
    const catalog = document.getElementById('catalog');
    catalog.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <p>${product.name} - $${product.price}</p>
            <button onclick="addToCart(${product.id})">В корзину</button>
        `;
        catalog.appendChild(productDiv);
    });
}

let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        saveCartToCookie();
        displayCart();
    }
}

function displayCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
    cart.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <p>${product.name} - $${product.price}</p>
            <button onclick="removeFromCart(${index})">Удалить из корзины</button>
        `;
        cartDiv.appendChild(productDiv);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCartToCookie();
    displayCart();
}

function saveCartToCookie() {
    const cartData = JSON.stringify(cart);
    document.cookie = `cart=${cartData}; path=/`;
    console.log(`Cookie set: cart=${cartData}`);  // Логирование
}

function loadCartFromCookie() {
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        if (name === 'cart' && value) {
            cart = JSON.parse(value);
            console.log('Cookie loaded:', cart);  // Логирование
        }
    });
}

// Вызов функции для отображения каталога товаров
document.addEventListener('DOMContentLoaded', () => {
    displayCatalog();
    loadCartFromCookie();
    displayCart();
});


