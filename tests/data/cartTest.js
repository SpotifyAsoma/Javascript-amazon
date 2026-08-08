import { removeFromCart, loadFromStorage, } from "../../data/cart.js";




describe('test suite: addToCart', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const productId3 = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';

  beforeEach(() => {
    spyOn(localStorage, 'setItem'); 
    spyOn(localStorage, 'getItem').and.callFake(() => {

      return JSON.stringify([{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '1',

      },{
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '2',
      }]);  
    });
  });


  
    


  it('adds an existing product to the cart', () => {

    loadFromStorage();

  });


  
  it('adds a new product to the cart', () => {
  localStorage.getItem.and.returnValue(
    JSON.stringify([])
  );

  loadFromStorage();

  
});


  it('Removing from cart', () => {
    loadFromStorage();
    removeFromCart(productId1);
    expect (localStorage.setItem).toHaveBeenCalledWith(
      'cart', JSON.stringify([{
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2',
      }])
    );
  });


  it('Remove a item thats not in cart', () => {
    loadFromStorage();
    removeFromCart(productId3);
    expect (localStorage.setItem).toHaveBeenCalledWith('cart' , JSON.stringify([{
      productId: productId1,
        quantity: 1,
        deliveryOptionId: '1',

      },{
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '2',
    }]))
  })


});

