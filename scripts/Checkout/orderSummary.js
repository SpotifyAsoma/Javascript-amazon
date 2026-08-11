import {cart, removeFromCart, updateCartQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryoption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderHeaderHTML } from '../Checkout/checkoutHeader.js';

const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM D' ));


export function renderOrderSummary() {




  let cartSummaryHTML = '';


  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProducts = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryoption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays ,
      'days'
    );
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );


    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container
    js-cart-item-container-${matchingProducts.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProducts.image}">

        <div class="cart-item-details">
          <div class="product-name js-product-name-${matchingProducts.id}">
            ${matchingProducts.name}
          </div>
          <div class="product-price js-product-price-${matchingProducts.id}">
            ${matchingProducts.getPrice()}
          </div>
          <div class="product-quantity js-product-quantity-${matchingProducts.id}">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link 
            js-delete-link-${matchingProducts.id}
            " data-product-id="${matchingProducts.id}">
              Delete
            </span>
          </div>
        </div>
        <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProducts, cartItem)}
        </div>
      </div>
    </div>
    `;
  });

  function deliveryOptionsHTML(matchingProducts, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays ,
        'days'
      );
      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );

      const priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      : `$${formatCurency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      
        
        <div class="delivery-option js-delivery-option js-delivery-option-${matchingProducts.id}-${deliveryOption.id}"
        data-product-id="${matchingProducts.id}"
        data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" 
          class = "js-delivery-input-${matchingProducts.id}-${deliveryOption.id}"
          ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProducts.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      
      
    
      `
    });

    return html;
  };




  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;


  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () =>{
      const productId = link.dataset.productId;
      removeFromCart(productId);
      renderOrderSummary();
      renderPaymentSummary();
      renderHeaderHTML();


      const container = document.querySelector(`.js-cart-item-container-${productId}`)
      const cartQuantity = updateCartQuantity();
      document.querySelector('.js-checkout-number').innerHTML = cartQuantity;
      console.log(container);
      //container.remove(); 
      
    });
    
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click' , () =>{
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
      renderHeaderHTML();

    });
  });

  
};

