'use strict';

let carts = document.querySelectorAll('.buy')
let products = [
    {tag: 1, name: 'title1', price: 10, inCart:0},
    {tag: 2, name: 'title2', price: 20, inCart:0},
    {tag: 3, name: 'title3', price: 30, inCart:0}
]

for (let i=0; i<carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i])
        totalCost(products[i])
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumber')
    if (productNumbers){
        document.querySelector('number-in-cart').textContent = productNumbers
    }
}



function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers')

    productNumbers = parseInt(productNumbers)
    
    if (productNumbers){
        localStorage.setItem('cartNumbers', productNumbers+1)
        document.querySelector('.cart span').textContent =productNumbers+1
    }else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.cart span').textContent =1
    }
    setItems(product)
}

function setItems(product){
    let cartItems=localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems);

    if(cartItems !=null){
        if (cartItems[product.tag]==undefined){
            cartItems={
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart+=1
    }else{
    product.inCart = 1
    cartItems = {[products.tag]:product}
    }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems))
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost')
    
    if (cartCost != null){
        cartCost = parseInt(cartCost)
        localStorage.setItem('totalCost', cartCost + product.price)
    }else{
        localStorage.setItem("totalCost", product.price)
    }
}

function displayCart(){
    let cartItems = localStorage.getItem('productsInCart')
    cartItems =JSON.parse(cartItems)
    let productContainer = document.querySelector('.product')
    let cartCost = localStorage.getItem('totalCost')
    if (cartItems && productContainer) {
        productContainer.innerHTML='';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class="products">
            <img src="./images/${item.tag}.jpg">
            <span>${item.name}</span>
            </div>
            <div class="price">${item.price}</div>
            <div class="quantity"> 
            <ion-icon class="decrease' name="arrow-dropdown"></ion-icon>
            <span>${item.inCart}</span>
            <ion-icon class="increase" name="arrow-dropup"></ion-icon>
            </div>
            <div class="total">
                ${item.inCart * item.price},00
            </div>
            `
        })
        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="BasketTotalTitle">
                Bsket Total </h4>
            <h4> 
                ${cartCost},00
            </h4>
        </div>
        `
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    totalCost()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    totalCost()
}

onLoadCartNumbers()
displayCart()
