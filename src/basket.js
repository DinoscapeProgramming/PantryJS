// basket.js - Manages individual baskets in Pantry

const Request = require('./request');

class Basket {
  constructor(pantryID, basketName) {
    this.pantryID = pantryID;
    this.basketName = basketName;
    this.store = {}; // The data of the basket
    this.isInitialized = false;
  }

  // Initialize the basket with data
  async init() {
    if (!this.isInitialized) {
      const basketData = await this.get(); // Fetch data from Pantry
      this.store = new Proxy(basketData, {
        set: (target, prop, value) => {
          target[prop] = value;  // Update the store data
          this.update(target).catch(console.error);  // Automatically update the Pantry service
          return true;  // Indicate the set operation was successful
        },
      });
      this.isInitialized = true;
    }
  }

  // Fetch the basket data from Pantry
  async get() {
    const response = await Request.get(`${this.pantryID}/basket/${this.basketName}`);
    return response || {};  // Return the basket data, or empty if not found
  }

  // Update the basket data in Pantry
  async update(data) {
    await Request.put(`${this.pantryID}/basket/${this.basketName}`, data);
  }

  // Getter for store data (returns the actual basket data)
  get storeData() {
    return this.store;
  }
}

module.exports = Basket;