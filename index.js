let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
const iconHeart = document.querySelector('.icon-heart');
const listWishlistHTML = document.querySelector('.listWishlist');
let iconCartSpan = document.querySelector('.icon-cart span');
let heartCartSpan = document.querySelector('.icon-heart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let closeWish = document.querySelector('.closewish');
let products = [];
let cart = [];
let wishlist = [];


iconCart.addEventListener('click', () => {
    if (body.classList.contains('showWishlist')) {
        // Close the wishlist tab and open the cart tab
        body.classList.remove('showWishlist');
        body.classList.add('showCart');
    } else {
        body.classList.toggle('showCart');
    }
});

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
iconHeart.addEventListener('click', () => {
    if (body.classList.contains('showCart')) {
        // Close the cart tab and open the wishlist tab
        body.classList.remove('showCart');
        body.classList.add('showWishlist');
    } else {
        body.classList.toggle('showWishlist');
    }
});



const addDataToHTML = () => {
    // Clear the default data from the HTML
    listProductHTML.innerHTML = '';

    // Add  data including the "Add to Cart" and "Add to Wishlist" buttons
    if (products.length > 0) {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML = `
                <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>
                <button class="addToWishlist">Add To Wishlist</button>
            `;
            listProductHTML.appendChild(newProduct);
        });
    }
}

// Attach a click event listener to add wishlist functionality
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addToWishlist')) {
        let id_product = positionClick.parentElement.dataset.id;
        addToWishlist(id_product);
    }
});

    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                    <span class="remove-cart">X</span>
                </div>
                
            `;
      
        });
    }
    iconCartSpan.innerText = totalQuantity;
};

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
            case 'minus':
                if (cart[positionItemInCart].quantity > 1) {
                    cart[positionItemInCart].quantity = cart[positionItemInCart].quantity - 1;
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

// const changeQuantityCart = (product_id, type) => {
//     let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
//     if(positionItemInCart >= 0){
//         let info = cart[positionItemInCart];
//         switch (type) {
//             case 'plus':
//                 cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
//                 break;
        
//             default:
//                 let changeQuantity = cart[positionItemInCart].quantity - 1;
//                 if (changeQuantity > 0) {
//                     cart[positionItemInCart].quantity = changeQuantity;
//                 }else{
//                     cart.splice(positionItemInCart, 1);
//                 }
//                 break;
//         }
//     }
//     addCartToHTML();
//     addCartToMemory();
// }
// Function to add a product to the wishlist
const addToWishlist = (product_id) => {
    // Check if the product is already in the wishlist
    const positionThisProductInWishlist = wishlist.findIndex((value) => value.product_id == product_id);
    

    if (wishlist.length <= 0) {
        wishlist = [{
            product_id: product_id,
            quantity: 1
        }];
    } else if (positionThisProductInWishlist < 0) {
        wishlist.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        // wishlist[positionThisProductInWishlist].quantity = wishlist[positionThisProductInWishlist].quantity + 1;
    }

    addWishlistToHTML();
    addWishlistToMemory();
}

// Function to add wishlist items to local storage
const addWishlistToMemory = () => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Function to display wishlist items in the HTML
const addWishlistToHTML = () => {
    // Clear the wishlist section
    listWishlistHTML.innerHTML = '';

    // Loop through wishlist items and display them
    wishlist.forEach(item => {
        let newItem = document.createElement('div');
        newItem.classList.add('wishlist-item');
        newItem.dataset.id = item.product_id;

        let positionProduct = products.findIndex((value) => value.id == item.product_id);
        let info = products[positionProduct];

        newItem.innerHTML = `
            <div class="image">
                <img src="${info.image}">
            </div>
            <div class="name">
                ${info.name}
            </div>
            <div class="totalPrice">$${info.price * item.quantity}</div>
            <div class="quantity">
                <span class="remove-wish">X</span>
            </div>
        `;

        listWishlistHTML.appendChild(newItem);
    });
   
}
const initApp = () => {
    // Get product data
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            addDataToHTML();

            // Get cart data from local storage
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }

            // Check if there are wishlist items in local storage
            if (localStorage.getItem('wishlist')) {
                wishlist = JSON.parse(localStorage.getItem('wishlist'));
                addWishlistToHTML();
            }

            // Attach a click event listener to add wishlist functionality
            listProductHTML.addEventListener('click', (event) => {
                let positionClick = event.target;
                if (positionClick.classList.contains('addToWishlist')) {
                    let id_product = positionClick.parentElement.dataset.id;
                    addToWishlist(id_product);
                }
            });

            // Attach a click event listener to remove wishlist items
            listWishlistHTML.addEventListener('click', (event) => {
                let positionClick = event.target;
                if (positionClick.classList.contains('remove-wish')) {
                    let product_id = positionClick.parentElement.parentElement.dataset.id;
                    removeWishlistItem(product_id);
                }
            });
                // Attach a click event listener to remove cart items
                listCartHTML.addEventListener('click', (event) => {
                    let positionClick = event.target;
                    if (positionClick.classList.contains('remove-cart')) {
                        let product_id = positionClick.parentElement.parentElement.dataset.id;
                        removeCartlistItem(product_id);
                    }
                });
        });
}

// Function to remove a product from the wishlist
const removeWishlistItem = (product_id)=> {
    const positionItemInWishlist = wishlist.findIndex((value) => value.product_id == product_id);
    if (positionItemInWishlist >= 0) {
        wishlist.splice(positionItemInWishlist, 1);
        addWishlistToHTML();
        addWishlistToMemory();
    }
}
// Function to remove a product from the cart
const removeCartlistItem = (product_id) => {
    const positionItemInCartlist = cart.findIndex((value) => value.product_id == product_id);
    if (positionItemInCartlist >= 0) {
        cart.splice(positionItemInCartlist, 1);
        addCartToHTML();
        addCartToMemory();
    }
}

initApp();

