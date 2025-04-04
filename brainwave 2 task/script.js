const products = [
    { id: 1, name: "Mango", origin: "India", price: 100, img: "mango.jpg" },
    { id: 2, name: "Basmati Rice", origin: "Punjab, India", price: 200, img: "rice.jpg" },
    { id: 3, name: "Turmeric", origin: "Kerala, India", price: 150, img: "turmeric.jpg" },
    { id: 4, name: "Cumin Seeds", origin: "Rajasthan, India", price: 180, img: "cumin.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currency = "INR";

function loadProducts() {
    const productContainer = document.getElementById("products");
    productContainer.innerHTML = "";
    
    products.forEach(product => {
        let price = currency === "INR" ? `₹${product.price}` : `$${(product.price / 80).toFixed(2)}`;
        productContainer.innerHTML += `
            <div class="product">
                <img src="${product.img}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>Origin: ${product.origin}</p>
                <p>Price: <span class="price">${price}</span></p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });
}

function addToCart(id) {
    const item = products.find(product => product.id === id);
    cart.push(item);
    document.getElementById("cart-count").innerText = cart.length;
    localStorage.setItem("cart", JSON.stringify(cart));
}

function viewCart() {
    const cartModal = document.getElementById("cart-modal");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        let price = currency === "INR" ? item.price : (item.price / 80).toFixed(2);
        total += Number(price);
        cartItems.innerHTML += `<li>${item.name} - ₹${price} <button onclick="removeFromCart(${index})">Remove</button></li>`;
    });

    cartTotal.innerText = currency === "INR" ? `₹${total}` : `$${(total / 80).toFixed(2)}`;
    cartModal.style.display = "block";
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    viewCart();
}

function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
}

document.getElementById("currency").addEventListener("change", function () {
    currency = this.value;
    loadProducts();
});

window.onload = loadProducts;
