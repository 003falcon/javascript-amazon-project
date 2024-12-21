import formatCurrency from "../../scripts/utils/money.js";

describe('Test Suite: Format Currency',()=>{
  it('format cents to dollars',()=>{
    expect(formatCurrency(1998)).toEqual('19.98');
  });
  it('works on zero cents',()=>{
    expect(formatCurrency(0)).toEqual('0.00');
  });
  it('able to round cents to nearest dollars',()=>{
    expect(formatCurrency(1998.5)).toEqual('19.99');
  });

  
});