import {
  Checkout,
  BuyNGetMFreeRule,
  BulkDiscountRule,
  RegularPriceRule,
} from "./checkout";

const pricingRules = [
  new BuyNGetMFreeRule("atv", 2, 1),
  new BulkDiscountRule("ipd", 5, 499.99),
  new RegularPriceRule("mbp"),
  new RegularPriceRule("vga"),
];

const customerOne = new Checkout(pricingRules);
customerOne.scan("atv");
customerOne.scan("atv");
customerOne.scan("atv");
customerOne.scan("vga");
const customerOneTotal = customerOne.total();
console.log("customerOneTotal", customerOneTotal); // 249.00

const customerTwo = new Checkout(pricingRules);
customerTwo.scan("atv");
customerTwo.scan("ipd");
customerTwo.scan("ipd");
customerTwo.scan("atv");
customerTwo.scan("ipd");
customerTwo.scan("ipd");
customerTwo.scan("ipd");
const customerTwoTotal = customerTwo.total();
console.log("customerTwoTotal", customerTwoTotal); // 2718.95
