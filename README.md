# PantryJS

**PantryJS** is a simple and powerful SDK for managing and syncing baskets in a pantry. It provides easy access to baskets, automatic synchronization with the Pantry service, and allows developers to manage data in a clean and intuitive way.

## Installation

To install **PantryJS**, use npm:

```bash
npm install pantry.js
```

## Usage

### Initialize Pantry SDK

```javascript
const PantrySDK = require('pantry.js');

const pantry = new PantrySDK('your-pantry-id');  // Initialize with Pantry ID
```

### Access and Modify a Basket

```javascript
// Access a basket (e.g., 'store')
async function useBasket() {
  const store = await pantry.store;  // Access the basket named 'store'

  // Modify the basket (this will automatically trigger an update to Pantry)
  store.someKey = 'newValue';  // Automatically triggers an update to Pantry!

  console.log(store);  // Output the store data

  // Access another basket (e.g., 'cart')
  const cart = await pantry.cart;  // Dynamically fetch the basket named 'cart'
  console.log(cart);
}

useBasket().catch(console.error);
```

## Features

- **Auto-sync**: When you modify basket data, it automatically syncs with the Pantry service.
- **Lazy Loading**: Baskets are fetched and initialized only when accessed for the first time.
- **Dynamic Basket Access**: Access baskets directly using `pantry.store`, `pantry.cart`, etc., without explicit function calls.

## License

MIT License. See LICENSE file for details.
