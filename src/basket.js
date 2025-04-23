const Request = require('./request');

class Basket {
  constructor(pantryID, basketName) {
    this.pantryID = pantryID;
    this.basketName = basketName;
    this.store = {};
    this.isInitialized = false;
  }

  async init() {
    if (!this.isInitialized) {
      const basketData = await this.get();
      this.store = new Proxy(basketData, {
        set: (target, prop, value) => {
          target[prop] = value;
          this.update(target).catch(console.error);
          return true;
        },
      });
      this.isInitialized = true;
    }
  }

  async get() {
    const response = await Request.get(`${this.pantryID}/basket/${this.basketName}`);
    return response || {};
  }

  async update(data) {
    await Request.put(`${this.pantryID}/basket/${this.basketName}`, data);
  }

  get storeData() {
    return this.store;
  }
}

module.exports = Basket;