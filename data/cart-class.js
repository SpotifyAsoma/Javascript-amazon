

class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)); 

    if (!this.cartItems) {
      this.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1',
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2',
      }];
    };
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }


  addTOCart(productId) {
    let matchingItem;

    this.cartItems.forEach((cartItems) => {
      if (productId === this.cartItems.productId) {
        matchingItem = this.cartItems ;
      }
    });

    const addedItem = document.querySelector(`.js-added-text-${productId}`);
    const selectedQuantity = document.querySelector(`.js-quantity-selector-${productId}`);
    const selectedQuantityNumber = Number(selectedQuantity.value)

    if (matchingItem) {
      matchingItem.quantity += selectedQuantityNumber;
    }else {
      this.cartItems.push({
        productId,
        quantity: selectedQuantityNumber,
        deliveryOptionId : '1',
    });
    }

    addedItem.style.opacity = '1';
    setTimeout(() => {
      addedItem.style.opacity = '0';
    }, 1000);
        

    this.saveToStorage();
  }


  addTOCart(productId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem ;
      }
    });

    const addedItem = document.querySelector(`.js-added-text-${productId}`) || document.createElement('div');
    const selectedQuantity = document.querySelector(`.js-quantity-selector-${productId}`);
    const selectedQuantityNumber = Number(selectedQuantity?.value) || 1;

    if (matchingItem) {
      matchingItem.quantity += selectedQuantityNumber;
    }else {
      this.cartItems.push({
        productId,
        quantity: selectedQuantityNumber,
        deliveryOptionId : '1',
    });
    }

    addedItem.style.opacity = '1';
    setTimeout(() => {
      addedItem.style.opacity = '0';
    }, 1000);
        

    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);

      }
    });
    cart = newCart;

    this.saveToStorage();
  }

  updateCartQuantity() {
    let cartQuantity = 0;

    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;

    });

    
    return cartQuantity
    
  }

  updateCartQuantity() {
    let cartQuantity = 0;

    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;

    });

    
    return cartQuantity
    
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {


      if (productId === cartItem.productId) {
          matchingItem = cartItem ;
        }
      });

      if (matchingItem) {matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
      } else {return};
   }

}



const cart = new Cart('cart');
const businessCart = new Cart('cart-business');



console.log(cart);
console.log(businessCart)
console.log(businessCart instanceof Cart);


