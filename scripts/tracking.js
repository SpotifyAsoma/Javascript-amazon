import {cart, updateCartQuantity,loadFromStorage} from '../../data/cart.js';
import { getDeliveryoption} from '../../data/deliveryOptions.js';
import { getProduct, loadProductsFetch } from '../data/products.js';






loadProductsFetch().then(() => {
  renderTrackingPage();
});

const cartQuantity = updateCartQuantity();
document.querySelector('.js-cart-quantity').innerHTML = cartQuantity ;

function renderTrackingPage() {
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const order = JSON.parse(localStorage.getItem(`order-${orderId}`));

  console.log(order);

  let html = '';

  let productId = order.productId
  console.log(productId)

  const product = getProduct(productId);
  
  console.log(product.name)
  const deliverDate = order.orderDate

  
  console.log(deliverDate)
  
  


  html += `
  <a class="back-to-orders-link link-primary" href="orders.html">
    View all orders
  </a>

  <div class="delivery-date">
    ${deliverDate}
  </div>

  <div class="product-info">
    ${product.name}
  </div>

  <div class="product-info">
    Quantity: ${order.quantity}
  </div>

  <img class="product-image" src="${product.image}">

  <div class="progress-labels-container">
    <div class="progress-label">
      Preparing
    </div>
    <div class="progress-label current-status">
      Shipped
    </div>
    <div class="progress-label">
      Delivered
    </div>
  </div>

  <div class="progress-bar-container">
    <div class="progress-bar"></div>
  </div>
  `
  document.querySelector('.js-order-traking').innerHTML=html;

}

