import {renderOrderSummary} from './Checkout/orderSummary.js';
import { renderPaymentSummary } from '../scripts/Checkout/paymentSummary.js';
import { renderHeaderHTML } from './Checkout/checkoutHeader.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js' 


async function loadPage() {
  try {
    /* throw 'error1'; */

    await loadProductsFetch();
    await new Promise(() => {
    loadProductsFetch(),
    renderOrderSummary();
    renderPaymentSummary();
    renderHeaderHTML();
  });


  } catch(error) {
    console.log(error , 'try again later')
  }


} 
loadPage();



/* 
Promise.all([
  loadProductsFetch(),
  
]).then(() =>{
  renderOrderSummary();
  renderPaymentSummary();
  renderHeaderHTML();
}) */




/* loadProducts(() => {
renderOrderSummary();
renderPaymentSummary();
renderHeaderHTML();
}) */


