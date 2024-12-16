import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import isWeekend from '../scripts/utils/isWeekend.js';
export const deliveryOptions=[
  {
  'id':'1',
  deliveryDays:7,
  priceCents:0
},
  {
  'id':'2',
  deliveryDays:3,
  priceCents:499
},
  {
  'id':'3',
  deliveryDays:1,
  priceCents:999
}
]

export function findDeliveryOption(deliveryOptions,cartItem)
{
  let deliveryOption;
  deliveryOptions.forEach((option)=>{
    if(option.id===cartItem.deliveryOptionsId)
      deliveryOption=option;
});
  return deliveryOption || deliveryOptions[0];
}
export function getNumberOfDays(deliveryOption)
{
  const todaysDate=dayjs();
  let numOfDays=deliveryOption.deliveryDays;
  let actualNoOfDays=0;
  while(numOfDays)
  {
    actualNoOfDays++;
    if(!isWeekend(todaysDate.add(actualNoOfDays,'days')))
      numOfDays--;
  }
  return actualNoOfDays;
}