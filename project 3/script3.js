document.addEventListener('DOMContentLoaded' , () => {
    console.log("script attached")
    const products =[
        {id : 1 , name : ' product 1 ' , price: 29.99},
        {id : 2 , name : ' product 2 ' , price: 39.99},
        {id : 3 , name : ' product 3 ' , price: 59.99}
    ];


const cart = JSON.parse(localStorage.getItem("mykey")) || [];




const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const emptyCartMessage = document.getElementById("empty-cart");
const cartTotalDisplay = document.getElementById("cart-total");
const totalPriceDisplay = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");

products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add('product');
    productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}</span> 
    <button data-id="${product.id}" >Add to cart</button>
    `
    productList.appendChild(productDiv);
});

productList.addEventListener('click',(e) =>{
    if(e.target.tagName === "BUTTON"){
        const productId = parseInt(e.target.getAttribute("data-id"));
        const product = products.find(p => p.id === productId);
        addToCart(product);
    }
});

function addToCart (product){
    cart.push(product);
    renderCart();
};

function renderCart(){
    cartItems.innerText = "";
    let totalPrice = 0 ;

    if (cart.length){
        emptyCartMessage.classList.add('hidden');
        cartTotalDisplay.classList.remove('hidden');
        cart.forEach((item, index) => {
            totalPrice += item.price; 
            const cartItem = document.createElement("div");
            cartItem.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)}
            <button data-id="${index}">Remove</button>
            `
            cartItems.appendChild(cartItem);
            totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}` ; 
        });
        saveCart();
        // console.log(cart)
    }else{
        emptyCartMessage.classList.remove('hidden');
        totalPriceDisplay.textContent = 0 ; 
        cartItems.innerHTML = `<p id="empty-cart">Your cart is empty. </p>`
        saveCart()
    };
};

cartItems.addEventListener("click",(e)=>{
    if(e.target.tagName === "BUTTON"){
        const toRemoveIndex = parseInt(e.target.getAttribute("data-id"))
        cart.splice(toRemoveIndex,1);
        renderCart();
    }
})

checkoutBtn.addEventListener("click",()=>{
    if(cart.length === 0){
        alert('Nothing in cart to checkout');

    }else{
        cart.length = 0 ;
        alert('Checkout successfully');
        renderCart();
    };
    });

function saveCart (){
    localStorage.setItem("mykey",JSON.stringify(cart))
}
renderCart()
});