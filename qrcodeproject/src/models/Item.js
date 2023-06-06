class Item {
  constructor(picture, name, description, ingredients, price) {
    Object.assign(this, { picture, name, description, ingredients, price })
  }
}

export default Item;