export class Product {
  constructor(_id = '', name = '', imageURL = '', description = '', price = 0) {
    this._id = _id;
    this.name = name;
    this.imageURL = imageURL;
    this.description = description;
    this.price = price;
  }
  _id: string;
  name: string;
  imageURL: string;
  description: string;
  price: number;
}
