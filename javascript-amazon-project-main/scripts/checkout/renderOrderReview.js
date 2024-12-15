//named exports
import {cart,
  removeFromCart,calculateCartQty, updateCart,
  updateDeliveryOption} from '../../data/cart.js'
import { products } from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
// default export - no curly braces required
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import {deliveryOptions} from '../../data/deliveryOptions.js'


export default function renderOrderReview()
{
 let cartSummaryHtml=''
 cart.forEach((cartItem)=> {
   const productId = cartItem.productId;

   let matchingProduct;
   products.forEach((product)=>{
     if(product.id===productId)
       matchingProduct=product;
   })
   let deliveryOption;
   const todaysDate=dayjs();
   
   deliveryOptions.forEach((option)=>{
     if(option.id===cartItem.deliveryOptionsId)
       deliveryOption=option;
   });
   const deliveryDate=todaysDate.add(deliveryOption.deliveryDays,'days');
   const formattedDate=deliveryDate.format(('dddd, MMM D'));
   const html=
   `
   <div class="cart-item-container js-cart-item-container-${productId}">
     <div class="delivery-date">
       Delivery date: ${formattedDate}
     </div>

     <div class="cart-item-details-grid">
       <img class="product-image"
         src=${matchingProduct.imageLink}>

       <div class="cart-item-details">
         <div class="product-name">
           ${matchingProduct.name}
         </div>
         <div class="product-price">
           $${formatCurrency(matchingProduct.priceCents)}
         </div>
         <div class="product-quantity">
           <span>
             Quantity: <span class="quantity-label-${productId}">${cartItem.quantity}</span>
           </span>
           <span class="update-quantity-link link-primary js-update-link"
           data-product-id="${productId}">
             Update
           </span>
           <input class="quantity-input js-quantity-input-${productId}">
           <span class="save-quantity-link link-primary" data-product-id="${productId}">Save</span>
           <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${productId}">
             Delete
           </span>
         </div>
       </div>

       <div class="delivery-options">
         <div class="delivery-options-title">
           Choose a delivery option:
         </div>
         ${deliveryOptionsHTML(matchingProduct,cartItem)}
       </div>
     </div>
   </div>
   
   `;
   cartSummaryHtml+=html;
 });

 function deliveryOptionsHTML(matchingProduct,cartItem)
 {
   const todaysDate=dayjs();
   let html ='';
   
   deliveryOptions.forEach((deliveryOption)=>{

     // console.log(todaysDate);
     const deliveryDate=todaysDate.add(deliveryOption.deliveryDays,'days');
     const formattedDate=deliveryDate.format(('dddd, MMM D'));
     const priceString= deliveryOption.priceCents===0
     ? 'FREE -'
     : `$${formatCurrency(deliveryOption.priceCents)} -`;
   

     const isChecked=(deliveryOption.id === cartItem.deliveryOptionsId);
     html+=`
     <div class="delivery-option js-delivery-option"
         data-product-id=${matchingProduct.id}
         data-delivery-options-id=${deliveryOption.id}>
       <input type="radio"
         ${isChecked ? 'checked' : ''}
         class="delivery-option-input"
         name="delivery-option-${matchingProduct.id}">
       <div>
         <div class="delivery-option-date">
           ${formattedDate}
         </div>
         <div class="delivery-option-price">
           ${priceString} Shipping
         </div>
       </div>
     </div>
     `;
     })
     return html;
 }
 document.querySelector('.js-order-summary').innerHTML= cartSummaryHtml;

 function updateCartQty()
 {
   let totalQty=calculateCartQty(cart);
   document.querySelector('.js-item-qty').innerHTML=`${totalQty} items`;
 }
 updateCartQty();
 document.querySelectorAll('.js-delete-link').forEach((button)=>{
   button.addEventListener('click',()=>{

     const curProdId=button.dataset.productId;
     removeFromCart(curProdId);
     // console.log(curProdId);
     document.querySelector(`.js-cart-item-container-${curProdId}`).remove();
     updateCartQty();


   })
 })

 document.querySelectorAll('.js-update-link').forEach((button)=>{
   button.addEventListener('click',()=>{
     const curProdId=button.dataset.productId;
     // console.log(curProdId);
     document.querySelector(`.js-cart-item-container-${curProdId}`).classList.add('is-editing-quantity');
     
     
   });
 });

 document.querySelectorAll('.save-quantity-link').forEach((button)=>{
   button.addEventListener('click',()=>{
     const curProdId=button.dataset.productId;
     
     
     let updatedValue=document.querySelector(`.js-quantity-input-${curProdId}`).value;
     updatedValue=Number(updatedValue);
     // console.log(curProdId,updatedValue,typeof updatedValue);
     if(updatedValue<0 && updatedValue>=1000)
       {
         alert(`Please enter valid value in the range 0 to 1000 both exclusive`)
         //early return
         return;
       }
       
       updateCart(curProdId,updatedValue);
       //setting the updated value
       document.querySelector(`.quantity-label-${curProdId}`).innerHTML=updatedValue;
       document.querySelector(`.js-cart-item-container-${curProdId}`).classList.remove('is-editing-quantity');
       updateCartQty();
       
       
     });
   });
   
   document.querySelectorAll('.js-delivery-option').forEach((button)=>{
     button.addEventListener('click',()=>{
     const {productId,deliveryOptionsId}=button.dataset;
     console.log(productId,deliveryOptionsId)
     updateDeliveryOption(productId,deliveryOptionsId);
     renderOrderReview();
   });

 });
}