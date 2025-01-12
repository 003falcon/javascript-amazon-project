import renderOrderReview from '../../scripts/checkout/renderOrderReview.js'
import { loadFromStorage,cart } from '../../data/cart.js';
//example of integration test 
//check how page looks
//check how page behaved
describe('test Suite:order review',()=>{
  
  const prodId1="e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const prodId2="15b6fc6f-327a-4ec4-896f-486349e85a3d";
  //hooks-
  // beforeEach->runs code in it before each test
  // afterEach->runs code in it before each test
  // afterAll->runs code in it before each test
  // beforeAll->runs code in it before each test
  beforeEach(()=>{
    spyOn(localStorage,'setItem');

    document.querySelector('.js-order-testcontainer').innerHTML=`
    <div class="js-order-summary"></div>
    <div class="payment-summary"></div>`;

    spyOn(localStorage,'getItem').and.callFake(()=>{

      return JSON.stringify([
        {productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity:3,
          deliveryOptionsId:'1'},
        {productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity:1,
          deliveryOptionsId:'2'}]);
    });
    loadFromStorage();
    renderOrderReview();
  });
  afterEach(()=>{    
    //clean up the page after testing and observing results 
    document.querySelector('.js-order-testcontainer').innerHTML='';
  })
  it('displays the cart',()=>{
    
    expect(document.querySelectorAll('.js-cart-item-container-test').length).toEqual(2);
    expect(
      document.querySelector(`.js-product-quantity-test-${prodId1}`).innerText
    ).toContain('3');
    expect(
      document.querySelector(`.js-product-quantity-test-${prodId2}`).innerText
    ).toContain('1');
  });

  it('removes from cart',()=>{
        
    document.querySelector(`.js-delete-link-${prodId1}`).click();
    expect(document.querySelectorAll('.js-cart-item-container-test').length).toEqual(1);
    expect(document.querySelector(`.js-cart-item-container-${prodId1}`)).toEqual(null);
    expect(document.querySelector(`.js-cart-item-container-${prodId2}`)).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(prodId2);
  });
  it('displays the name of products',()=>{
    expect(document.querySelector(`.js-product-name-test-${prodId1}`).innerText).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(document.querySelector(`.js-product-name-test-${prodId2}`).innerText).toContain('Intermediate Size Basketball');

  })
  it('displays $ sign before price',()=>{
    expect(document.querySelector(`.js-product-price-test-${prodId1}`).innerText).toContain('$');
    expect(document.querySelector(`.js-product-price-test-${prodId2}`).innerText).toContain('$');

  })
      
});