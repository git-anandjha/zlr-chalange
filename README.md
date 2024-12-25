# Checkout System

A TypeScript implementation of a flexible checkout system with customizable pricing rules.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd checkout-system
```

2. Install dependencies:
```bash
npm install
```

## Project Structure

```
checkout-system/
├── src/
│   ├── checkout.ts         # Main checkout implementation
│   └── types/
│       └── index.ts        # Type definitions
├── tests/
│   └── checkout.test.ts    # Test suite
├── package.json
├── tsconfig.json
├── jest.config.js
└── .eslintrc.json
```

## Available Scripts

- `npm run build`: Compile TypeScript to JavaScript
- `npm test`: Run test suite
- `npm run lint`: Run ESLint
- `npm start`: Run the application using ts-node

## Example Usage

```typescript
const pricingRules = [
  new BuyNGetMFreeRule('atv', 2, 1),     // 3 for 2 on Apple TVs
  new BulkDiscountRule('ipd', 5, 499.99), // Bulk discount on iPads
  new RegularPriceRule('mbp'),           // Regular pricing
  new RegularPriceRule('vga')
];

const checkout = new Checkout(pricingRules);
checkout.scan('atv');
checkout.scan('ipd');
const total = checkout.total();
```

## Running Tests

```bash
npm test
```

## Adding New Pricing Rules

1. Implement the `PricingRule` interface
2. Add the new rule to the pricing rules array when creating a checkout instance

## Code Style

The project uses ESLint with TypeScript support. Run `npm run lint` to check for style issues.