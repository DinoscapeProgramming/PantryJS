const Basket = require('./basket');
const Request = require('./request');

class Pantry {
  constructor(pantryID) {
    this.pantryID = pantryID;
    this.baskets = {};

    return new Proxy(this, {
      get: async (target, basketName) => {
        if (!this.baskets[basketName]) {
          const basket = new Basket(this.pantryID, basketName);
          await basket.init();
          this.baskets[basketName] = basket;
        }
        return this.baskets[basketName].storeData;
      }
    });
  }

  async details() {
    const response = await Request.get(`${this.pantryID}`);
    return response;
  }
}

module.exports = Pantry;