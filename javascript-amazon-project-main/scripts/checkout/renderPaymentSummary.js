import { findProduct } from "../../data/products.js";
import {calculateCartQty, cart} from "../../data/cart.js"
import { deliveryOptions, findDeliveryOption } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";

export function paymentSummary()
{
  let itemsCost=0;
  let shippingCost=0;
  cart.forEach((item) => {
    let matchingProduct= findProduct(item.productId);
    itemsCost+=(item.quantity * matchingProduct.priceCents);

    let deliveryOption=findDeliveryOption(deliveryOptions,item);
    shippingCost+=deliveryOption.priceCents;
    
  });
  const totalCents=itemsCost+shippingCost;
  const taxCents=totalCents*0.1;
  const totalCentsAfterTax=totalCents+taxCents;
  console.log(itemsCost,shippingCost,totalCentsAfterTax);
  const totalItems=calculateCartQty(cart);

  let html='';
  html+=
  `
  <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${totalItems}):</div>
      <div class="payment-summary-money">$${formatCurrency(itemsCost)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingCost)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCentsAfterTax)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;
  document.querySelector('.payment-summary').innerHTML=html;
  // paymentSummary();
}