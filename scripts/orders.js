import {cart, updateCartQuantity,loadFromStorage} from '../data/cart.js';
import {getProduct, loadProductsFetch} from '../data/products.js';
import { multiProductDeliverySum} from '../scripts/utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { getDeliveryoption} from '../data/deliveryOptions.js';


// .. means go back (folder)


Promise.all([
  loadProductsFetch(),
  loadFromStorage()
]).then(() => {

  renderOrdersHTML();
});

const cartQuantity = updateCartQuantity();

export function renderOrdersHTML() {
  let html = '';
  cart.forEach((cartItem) => {
      const productId = cartItem.productId;
  
      const matchingProducts = getProduct(productId);

  
      const deliveryOptionId = cartItem.deliveryOptionId;
  
      const deliveryOption = getDeliveryoption(deliveryOptionId);
    
      const today = dayjs();

      const todayFormated = today.format('MMMM D')

      
      const deliveryDate = today.add(
      deliveryOption.deliveryDays ,
      'days'
      );
      const dateString = deliveryDate.format(
      'dddd, MMMM D'
      );

      



      const orderId = crypto.randomUUID();

      const order = {
        orderId: orderId,
        productId: matchingProducts.id,
        quantity: cartItem.quantity,
        orderDate: dateString
      };

      localStorage.setItem(`order-${orderId}`,JSON.stringify(order));
          
  

      html += `
        <div class="order-container">
            <div class="order-header">
              <div class="order-header-left-section">
                <div class="order-date">
                  <div class="order-header-label">Order Placed:</div>
                  <div>${todayFormated}</div>
                </div>
                <div class="order-total">
                  <div class="order-header-label">Total:</div>
                  <div>$${multiProductDeliverySum(matchingProducts.priceCents,cartItem.quantity,deliveryOption.priceCents)}</div>
                </div>
              </div>

              <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${matchingProducts.id}</div>
              </div>
            </div>

            <div class="order-details-grid">
              <div class="product-image-container">
                <img src="${matchingProducts.image}">
              </div>

              <div class="product-details">
                <div class="product-name">
                  ${matchingProducts.name}
                </div>
                <div class="product-delivery-date">
                  Arriving on: June 17
                </div>
                <div class="product-quantity">
                  Quantity: ${cartItem.quantity}
                </div>
                <button class="buy-again-button button-primary">
                  <img class="buy-again-icon" src="images/icons/buy-again.png">
                  <span class="buy-again-message">Buy it again</span>
                </button>
              </div>

              <div class="product-actions">
                <a href="tracking.html?orderId=${orderId}">
                  <button class="track-package-button button-secondary">
                    Track package
                  </button>
                </a>
              </div>
            </div>
          </div>
        `
 })
  document.querySelector('.js-order-container').innerHTML = html;
  


};


document.querySelector('.js-cart-quantity').innerHTML = cartQuantity ;