import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroceriesServiceService {
  items = [{
    name: "Milk",
    quantity: 2
  },
  {
    name: "Bread",
    quantity: 4
    },
  {
    name: "Banana",
    quantity: 3
    },
  {
    name: "Sugar",
    quantity: 1
  }]
  constructor() { }
  getItems() {
    return this.items;
  }
  remvoveItem(index) {
    this.items.splice(index, 1);
  }
  addItem(item) {
    this.items.push(item);
  }
  editItem(item, index) {
    this.items[index] = item;
  }
}
