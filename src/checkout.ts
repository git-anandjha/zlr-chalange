import { PricingRule, Product, products } from "./types";

// Pricing rules implementations
class BulkDiscountRule implements PricingRule {
  constructor(
    private sku: string,
    private minQuantity: number,
    private discountedPrice: number
  ) {}

  apply(items: Product[]): number {
    const relevantItems = items.filter((item) => item.sku === this.sku);
    const quantity = relevantItems.length;

    if (quantity >= this.minQuantity) {
      return quantity * this.discountedPrice;
    }

    return quantity * (relevantItems[0]?.price || 0);
  }
}

class BuyNGetMFreeRule implements PricingRule {
  constructor(
    private sku: string,
    private buyQuantity: number,
    private freeQuantity: number
  ) {}

  apply(items: Product[]): number {
    const relevantItems = items.filter((item) => item.sku === this.sku);
    const quantity = relevantItems.length;
    const regularPrice = relevantItems[0]?.price || 0;

    const paidItems = Math.ceil(
      quantity * (this.buyQuantity / (this.buyQuantity + this.freeQuantity))
    );
    return paidItems * regularPrice;
  }
}

class RegularPriceRule implements PricingRule {
  constructor(private sku: string) {}

  apply(items: Product[]): number {
    const relevantItems = items.filter((item) => item.sku === this.sku);
    return relevantItems.reduce((sum, item) => sum + item.price, 0);
  }
}

// Main checkout class
class Checkout {
  // Private items array to store scanned products for each checkout instance
  private items: Product[] = [];

  constructor(private pricingRules: PricingRule[]) {}

  scan(sku: string): void {
    const product = products[sku];
    if (product) {
      this.items.push(product);
    }
  }

  total(): number {
    return Number(
      this.pricingRules
        .reduce((total, rule) => total + rule.apply(this.items), 0)
        .toFixed(2)
    ); // to two decimal places
  }
}

// Export for testing
export {
  Checkout,
  Product,
  PricingRule,
  BulkDiscountRule,
  BuyNGetMFreeRule,
  RegularPriceRule,
  products,
};
