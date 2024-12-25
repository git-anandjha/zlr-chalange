// Types and interfaces
interface Product {
  sku: string;
  name: string;
  price: number;
}

interface PricingRule {
  apply(items: Product[]): number;
}

// Product catalog
const products: Record<string, Product> = {
  ipd: { sku: "ipd", name: "Super iPad", price: 549.99 },
  mbp: { sku: "mbp", name: "MacBook Pro", price: 1399.99 },
  atv: { sku: "atv", name: "Apple TV", price: 109.5 },
  vga: { sku: "vga", name: "VGA adapter", price: 30.0 },
};

export { Product, PricingRule, products };
