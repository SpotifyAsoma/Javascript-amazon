import {renderOrderSummary} from './Checkout/orderSummary.js';
import { renderPaymentSummary } from '../scripts/Checkout/paymentSummary.js';
import { renderHeaderHTML } from './Checkout/checkoutHeader.js';
import '../data/cart-class.js';


renderHeaderHTML();
renderOrderSummary();
renderPaymentSummary();
