import { renderOrderSummary } from "../../scripts/Checkout/orderSummary.js";
import { loadFromStorage,cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import {formatCurency} from "../../scripts/utils/money.js";
import { renderPaymentSummary } from "../../scripts/Checkout/paymentSummary.js";
import { loadProducts } from "../../data/products.js";


describe('Test suite; renderOrderSummary.js', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
 
  beforeAll((done) => {
    loadProducts(() => {
      done();
    });
    
  });

  afterEach(() =>{
    document.querySelector('.js-test-container').innerHTML = '';
  })

  beforeEach(() => {
    

    

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-checkout-header"></div>
      <div class="js-payment-summary"></div>
      <div class="js-checkout-number"></div>

    `;
    
    
    spyOn(localStorage, 'getItem').and.callFake(() => {

      return JSON.stringify([{
    productId: productId1,
    quantity: 2,
    deliveryOptionId: '1',
  }, {
    productId: productId2,
    quantity: 1,
    deliveryOptionId: '2',
  }]);
    });
    loadFromStorage();

    renderOrderSummary();
  });


  it('displays the cart', () => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length 
  ).toEqual(2);
  
  expect ( 
    document.querySelector(`.js-product-quantity-${productId1}`).innerText
  ).toContain('Quantity: 2');

  expect ( 
    document.querySelector(`.js-product-quantity-${productId2}`).innerText
  ).toContain('Quantity: 1');

  
  

  
  });




  it('removes a product', () => {
    


    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(
      document.querySelectorAll('.js-cart-item-container').length 
  ).toEqual(1);

 expect(
  document.querySelector(`.js-cart-item-container-${productId1}`)
).toEqual(null);

  expect( document.querySelector(`.js-cart-item-container-${productId2}`)
  ).not.toEqual(null);

  expect(cart.length).toEqual(1);
  expect(cart[0].productId).toEqual(productId2);
  });

  it('Shows name of the product correctly', () => {
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toContain(getProduct(productId1).name);
  });

  it ('Shows price of the products correctly', () => {
    expect(
        document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toContain(`$${formatCurency(getProduct(productId1).priceCents)}`);
    
  });



  it('Checks the delivery options', () => {
    
    document.querySelector(`.js-delivery-option-${productId1}-1`).click();
    expect(cart[0].deliveryOptionId).toBe('1');
    expect(
      document.querySelector(`.js-delivery-input-${productId1}-1`).checked
    ).toBe(true);
      

    document.querySelector(`.js-delivery-option-${productId1}-3`).click();
    expect(cart[0].deliveryOptionId).toBe('3');
    expect(
      document.querySelector(`.js-delivery-input-${productId1}-3`).checked
    ).toBe(true);
  });


  it('Checks the delivery option selected price is correct in paymentSummary', () => {
    renderPaymentSummary();
    
    document.querySelector(`.js-delivery-option-${productId1}-1`).click(); 
    document.querySelector(`.js-delivery-option-${productId2}-1`).click();
    expect(
      document.querySelector(`.js-shipping`).innerText
    ).toBe('$0.00');

    document.querySelector(`.js-delivery-option-${productId1}-2`).click(); 
    document.querySelector(`.js-delivery-option-${productId2}-1`).click();
    expect(
      document.querySelector(`.js-shipping`).innerText
    ).toBe('$4.99');

    document.querySelector(`.js-delivery-option-${productId1}-2`).click(); 
    document.querySelector(`.js-delivery-option-${productId2}-2`).click();
    expect(
      document.querySelector(`.js-shipping`).innerText
    ).toBe('$9.98');

    document.querySelector(`.js-delivery-option-${productId1}-3`).click(); 
    document.querySelector(`.js-delivery-option-${productId2}-3`).click();
    expect(
      document.querySelector(`.js-shipping`).innerText
    ).toBe('$19.98');


  });

});
