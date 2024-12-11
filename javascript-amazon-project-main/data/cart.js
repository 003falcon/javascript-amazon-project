export const cart=[
  {productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",quantity:3},
  {productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",quantity:1}]
//export keyword is written in front of those variables to be used by other files
export function addProductToCart(productId,qtySelected)
{
  let isInCart=false;

      cart.forEach((cartItem)=>{
        if(cartItem.productId === productId)
        {
          cartItem.quantity+=qtySelected;
          isInCart=true;
        }
      })

      if(!isInCart)
      {
        cart.push({
          productId,
          quantity:qtySelected
        });
      }
}