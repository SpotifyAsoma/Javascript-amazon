import {renderOrderSummary} from './Checkout/orderSummary.js';
import { renderPaymentSummary } from '../scripts/Checkout/paymentSummary.js';
import { renderHeaderHTML } from './Checkout/checkoutHeader.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js' 





Promise.all([
  loadProductsFetch(),
  
]).then(() =>{
  console.log('2')
  renderOrderSummary();
  renderPaymentSummary();
  renderHeaderHTML();
})




/* loadProducts(() => {
renderOrderSummary();
renderPaymentSummary();
renderHeaderHTML();
}) */


