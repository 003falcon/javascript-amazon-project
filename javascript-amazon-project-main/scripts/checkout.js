//Using MVC (Model -View - Controller ) design pattern
import { renderCheckoutHeader } from './checkout/renderCheckoutHeader.js';
import renderOrderReview from './checkout/renderOrderReview.js'
import {paymentSummary} from './checkout/renderPaymentSummary.js'

//header rendered first
renderCheckoutHeader();
renderOrderReview();
paymentSummary();