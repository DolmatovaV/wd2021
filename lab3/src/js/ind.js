

let carts = document.querySelectorAll('.buy')
let products = [
    {tag: 1, name: 'title1', price: 10, inCart:0},
    {tag: 2, name: 'title2', price: 20, inCart:0},
    {tag: 3, name: 'title3', price: 30, inCart:0}
]


for (let i=0; i<carts.length; i++){
    carts[i].addEventListener('click', () => {
        totalInCart(products[i])
        totalCost(products[i])
    })
}

function showCart(){
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    let productContainer = document.querySelector('.products')
    let cartCost = localStorage.getItem('totalCost')
    if (cartItems && productContainer) {
        productContainer.innerHTML='';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class="products" id="${item.tag}">
                <span class="cart-name">${item.name}</span>

                <div class="price">${item.price}</div>
                <div class="quantity"> 
                <button class="increase">+</button> 
                <span class="number-of-item-incart">${item.inCart}</span>
                <button class="decrease">-</button>
                </div>
                <div class="total">
                    ${item.inCart * item.price},00
                </div>
            </div>
            `
        })
        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="BasketTotalTitle">
                Basket Total </h4>
            <h4 class="basketTotal"> 
                ${cartCost},00
            </h4>
        </div>
        `
    }
}

//перевіряє local storage і виводить в меню кількість
function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumber')
    if (productNumbers){
        document.querySelector('number-in-cart').textContent = productNumbers
    }
}


//рахує натискання на осн сторінці
function totalInCart(product){
    let productNumbers = localStorage.getItem('cartNumbers')// cartNumbers -- загальна кількість товарів у корзині, для виводу в меню index.html

    productNumbers = parseInt(productNumbers)
    
    if (productNumbers){
        localStorage.setItem('cartNumbers', productNumbers+1)
        document.querySelector('.number-in-cart').textContent =productNumbers+1
    }else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.number-in-cart').textContent =1
    }
    setItems(product)
}

//рахує кількість речей для кожного виду
function setItems(product){
    let cartItems=localStorage.getItem('productsInCart') //к-сть кожного виду
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



function clearAll() {
    localStorage.clear()
    location.reload()
}

function buying(){
    alert("Thanks!")
    clearAll()
}

removeall.onclick = clearAll
pay.onclick = buying

onLoadCartNumbers()
showCart()
