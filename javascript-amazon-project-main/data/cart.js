export const cart=[]
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