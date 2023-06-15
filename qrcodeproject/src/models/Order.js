class Order {
  constructor(picture, name, quantity, price, comment) {
    Object.assign(this, { picture, name, quantity, price, comment })
  }
}

export default Order;