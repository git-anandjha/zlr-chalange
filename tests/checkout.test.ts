import {
  Checkout,
  BulkDiscountRule,
  BuyNGetMFreeRule,
  RegularPriceRule,
  products,
} from "../src/checkout";

describe("Checkout System", () => {
  let pricingRules: any[];

  beforeEach(() => {
    pricingRules = [
      new BuyNGetMFreeRule("atv", 2, 1),
      new BulkDiscountRule("ipd", 5, 499.99),
      new RegularPriceRule("mbp"),
      new RegularPriceRule("vga"),
    ];
  });

  test("should correctly calculate total for 3 Apple TVs (3 for 2 deal)", () => {
    const checkout = new Checkout(pricingRules);
    ["atv", "atv", "atv"].forEach((item) => checkout.scan(item));
    expect(checkout.total()).toBe(219.0);
  });

  test("should correctly calculate total for bulk iPad purchase", () => {
    const checkout = new Checkout(pricingRules);
    ["ipd", "ipd", "ipd", "ipd", "ipd"].forEach((item) => checkout.scan(item));
    expect(checkout.total()).toBe(2499.95);
  });

  test("should correctly calculate mixed basket with deals", () => {
    const checkout = new Checkout(pricingRules);
    ["atv", "ipd", "ipd", "atv", "ipd", "ipd", "ipd"].forEach((item) =>
      checkout.scan(item)
    );
    expect(checkout.total()).toBe(2718.95);
  });

  test("should apply regular pricing for items without special rules", () => {
    const checkout = new Checkout(pricingRules);
    ["mbp", "vga"].forEach((item) => checkout.scan(item));
    expect(checkout.total()).toBe(1429.99);
  });

  test("should handle invalid SKUs gracefully", () => {
    const checkout = new Checkout(pricingRules);
    checkout.scan("invalid");
    expect(checkout.total()).toBe(0.0);
  });
});
