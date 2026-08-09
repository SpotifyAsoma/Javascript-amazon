import {renderOrderSummary} from './Checkout/orderSummary.js';
import { renderPaymentSummary } from '../scripts/Checkout/paymentSummary.js';
import { renderHeaderHTML } from './Checkout/checkoutHeader.js';
import '../data/cart-oop.js';


renderHeaderHTML();
renderOrderSummary();
renderPaymentSummary();
