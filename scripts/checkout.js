import {renderOrderSummary} from './Checkout/orderSummary.js';
import { renderPaymentSummary } from '../scripts/Checkout/paymentSummary.js';
import { renderHeaderHTML } from './Checkout/checkoutHeader.js';
import { loadProducts } from '../data/products.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js' 

loadProducts(() => {
renderOrderSummary();
renderPaymentSummary();
renderHeaderHTML();
})


