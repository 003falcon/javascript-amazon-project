export function formatCurrency(priceCents)
{
  return (Math.round(priceCents)/100).toFixed(2);
}

//the below syntax signifies that the function formatCurrency will
//be exported by default from this file
//Also , note only one function/variable can be exported by default from a single file


export default formatCurrency;