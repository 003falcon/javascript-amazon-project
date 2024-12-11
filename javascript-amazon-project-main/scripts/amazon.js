// console.log('bismillah')

//example of how to save data to generate html
// const products=[
//     {
//     imageLink:'images/products/athletic-cotton-socks-6-pairs.jpg',
//     name:'Black and Gray Athletic Cotton Socks - 6 Pairs',
//     rating:{
//       stars:4.5,
//       numUsers:87
//     },
//     priceCents:1090
//   },
//   {
//     imageLink:'images/products/intermediate-composite-basketball.jpg',
//     name:'Intermediate Size Basketball',
//     rating:{
//       stars:4,
//       numUsers:127
//     },
//     priceCents:2095
//   },
//   {
//     imageLink:'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
//     name:'Adults Plain Cotton T-Shirt - 2 Pack',
//     rating:{
//       stars:4.5,
//       numUsers:56
//     },
//     priceCents:799
//   },
//   {
//     imageLink:'images/products/black-2-slot-toaster.jpg',
//     name:'2 Slot Toaster - Black',
//     rating:{
//       stars:5,
//       numUsers:2197
//     },
//     priceCents:1899
//   }

// ]

let productsHTML='';
products.forEach((product)=>{
  const html=`
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src=${product.imageLink}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary"
          data-product-id="${product.id}">
          
            Add to Cart
          </button>
        </div>`;
  productsHTML+=html;
})
//data-attribute of HTML
//-is simply another attribute but starts with data
//written in kebab case
//
console.log(productsHTML);

document.querySelector('.products-grid').innerHTML=productsHTML;
document.querySelectorAll('.add-to-cart-button')
  .forEach((button)=>{
    button.addEventListener('click',()=>{

      // const productName=button.dataset.productName;
      const productId=button.dataset.productId;
      console.log(button.dataset);

      let isInCart=false;

      cart.forEach((item)=>{
        if(item.productId === productId)
        {
          item.quantity++;
          isInCart=true;
        }
      })

      if(!isInCart)
      {
        cart.push({
          productId,
          quantity:1
        });
      }
      console.log(cart);
  })
});