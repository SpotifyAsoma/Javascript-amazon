import { cart, updateCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryoption } from "../../data/deliveryOptions.js";
import { formatCurency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";



export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
    
    const deliveryOption = getDeliveryoption(cartItem.deliveryOptionId);
    shippingPriceCents +=  deliveryOption.priceCents
    
  });  

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = taxCents + totalBeforeTaxCents;
  const cartQuantity = updateCartQuantity();

  const paymentSummaryHTML = `
   <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${formatCurency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-shipping">$${formatCurency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-palce-order-button">
            Place your order
          </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

  document.querySelector('.js-palce-order-button').addEventListener('click', async() => {
    try {
      const response = await fetch('https://supersimplebackend.dev/orders', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        cart: cart
      })
    });

    const order = await response.json();
    addOrder(order);

    } catch (error) {
      console.log('try again later')
    }

    window.location.href = 'orders.html';
    
  })
};