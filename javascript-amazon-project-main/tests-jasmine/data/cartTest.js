import {cart,addProductToCart, loadFromStorage} from '../../data/cart.js'

describe('Adding an item to cart',()=>{

  beforeEach(()=>{
    //we don't want local storage to store these tests items in it 
    spyOn(localStorage,'setItem');
  });
  it('add a new product',()=>{
    //the below is known as a mock
    //this allows to bypass flaky tests(the tests that sometimes passes and sometimes fails) by passing fake version of code that's causing the undesired behaviour
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });
      
    loadFromStorage();
    // console.log(localStorage.getItem('cart'));
    addProductToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d',1);
    expect(cart.length).toEqual(1);
    //this below method toHavebeen... can be used for checking a method which is spied on-here setItem
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity:1,
      deliveryOptionsId:'1'}]));
    expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart[0].quantity).toEqual(1);
    console.log(cart);
  });
  it('adds an existing product',()=>{

    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1,
        deliveryOptionsId:'1'}]);
    });
    loadFromStorage();
    addProductToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d',1);

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity:2,
      deliveryOptionsId:'1'}]));
    // expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart[0].quantity).toEqual(2);
  });
});