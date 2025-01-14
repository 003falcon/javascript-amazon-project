//named exports
import {cart,
  removeFromCart,calculateCartQty, updateCart,
  updateDeliveryOption} from '../../data/cart.js'
import {findProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
// default export - no curly braces required
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import {deliveryOptions, findDeliveryOption, getNumberOfDays} from '../../data/deliveryOptions.js'
import { paymentSummary } from './renderPaymentSummary.js';


export default function renderOrderReview()
{
 let cartSummaryHtml='';
 cart.forEach((cartItem)=> 
  {

    const productId = cartItem.productId;

    const matchingProduct =findProduct(productId);

    let deliveryOption=findDeliveryOption(deliveryOptions,cartItem);

    const todaysDate=dayjs();
    const actualNoOfDays=getNumberOfDays(deliveryOption);
    const deliveryDate=todaysDate.add(actualNoOfDays,'days');
    const formattedDate=deliveryDate.format(('dddd, MMM D'));
    const html=
    `
    <div class="cart-item-container 
    js-cart-item-container-test js-cart-item-container-${productId}">
      <div class="delivery-date">
        Delivery date: ${formattedDate}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src=${matchingProduct.imageLink}>

        <div class="cart-item-details">
          <div class="product-name js-product-name-test-${productId}">
            ${matchingProduct.name}
          </div>
          <div class="product-price js-product-price-test-${productId}">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity js-product-quantity-test-${productId}">
            <span>
              Quantity: <span class="quantity-label-${productId}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link"
            data-product-id="${productId}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${productId}">
            <span class="save-quantity-link link-primary" data-product-id="${productId}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${productId}" data-product-id="${productId}">
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

    
      const actualNoOfDays=getNumberOfDays(deliveryOption);
      const deliveryDate=todaysDate.add(actualNoOfDays,'days');
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

  document.querySelectorAll('.js-delete-link').forEach((button)=>{
    button.addEventListener('click',()=>{

      const curProdId=button.dataset.productId;
      removeFromCart(curProdId);
      // console.log(curProdId);
      renderOrderReview();
      // updateCartQty();
      paymentSummary(); 


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
        
        // updateCart(curProdId,updatedValue);
        //setting the updated value
        document.querySelector(`.js-cart-item-container-${curProdId}`).classList.remove('is-editing-quantity');
        renderOrderReview();
        // updateCartQty();
        paymentSummary();
        
        
      });
    });
    
    document.querySelectorAll('.js-delivery-option').forEach((button)=>{
      button.addEventListener('click',()=>{
      const {productId,deliveryOptionsId}=button.dataset;
      console.log(productId,deliveryOptionsId)
      updateDeliveryOption(productId,deliveryOptionsId);//update
      renderOrderReview();//regenerate html
      paymentSummary();
    });

 });
}