import { products,getProduct, loadProducts } from "../../data/products.js";

describe ('Test products.js and check the values', () => {
  
  beforeAll((done) => {
    loadProducts(() => {
      done();
    });
  });
    


  it('Check if products have name, image, price and keywords',() => {
    products.forEach((product) => {
      expect(product.name).not.toBe('');
      expect(product.image).not.toBe('');
      expect(product.priceCents).not.toBe('');
      expect(product.keywords).not.toBe('');
    })
  });


  it('getProduct check', () => {
    expect(getProduct('e43638ce-6aa0-4b85-b27f-e1d07eb678c6').id).toBe('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
  });

  it('getProduct returns undefined if product does not exist', () => {
    expect(getProduct('invalid-id')).toBe(undefined);
  });



});