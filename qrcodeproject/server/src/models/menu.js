
//the model for 'menu' document
class Food{
    constructor({name, description, price, category, alcohol}){
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.alcohol = alcohol;
    }
}

module.exports = class Menu{
    static async createMenu() {

    }
}
