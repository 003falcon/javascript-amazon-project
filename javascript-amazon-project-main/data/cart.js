export let cart=JSON.parse(localStorage.getItem('cart'))|| [
  {productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",quantity:3,deliveryOptionsId:'1'},
  {productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",quantity:1,deliveryOptionsId:'2'}]
//export keyword is written in front of those variables to be used by other files

function saveToLocalStorage()
{
  localStorage.setItem('cart',JSON.stringify(cart));
}
export function calculateCartQty(cart)
{
  
  let totalQty=0;
  cart.forEach((cartItem)=>{
    totalQty+=cartItem.quantity
  });
  return totalQty;
  
}
export function addProductToCart(productId,qtySelected)
{
  let isInCart=false;
  let matchingProduct=findProduct(productId);
  if(matchingProduct)
  { 
    isInCart=true;
    matchingProduct.quantity+=qtySelected;
  }
      // cart.forEach((cartItem)=>{
      //   if(cartItem.productId === productId)
      //   {
      //     cartItem.quantity+=qtySelected;
      //     isInCart=true;
      //   }
      // })

  if(!isInCart)
  {
    cart.push({
      productId,
      quantity:qtySelected,
      deliveryOptionsId:'1'
    });
  }
  saveToLocalStorage();
}

export function removeFromCart(productId)
{
  cart=cart.filter((item)=>{
    return item.productId!==productId;
  })
  saveToLocalStorage();
  
}
function findProduct(productId)
{
  let matchingProduct;
  cart.forEach((item)=>{
    if(productId === item.productId)
      matchingProduct=item;
  })
  return matchingProduct;
}
export function updateCart(productId,newQty)
{
  let matchingProduct = findProduct(productId);
  // cart.forEach((item)=>{
  //   if(productId === item.productId)
  //     matchingProduct=item;
  // })
  // console.log(matchingProduct);
  matchingProduct.quantity=newQty;
  saveToLocalStorage();

}

export function updateDeliveryOption(productId,newDeliveryOptionId)
{
  let matchingProduct=findProduct(productId);
  console.log(matchingProduct);
  matchingProduct.deliveryOptionsId=newDeliveryOptionId;
  saveToLocalStorage();
}