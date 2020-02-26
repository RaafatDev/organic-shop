import { ShoppingCartItem } from "./shopping-cart-item";

// export interface ShoppingCart {
//   items: ShoppingCartItem[];
// }

export class ShoppingCart {
  // items: ShoppingCartItem[];

  constructor(public items: ShoppingCartItem[]) {}

  get totalItemsCount() {
    let count = 0;
    // console.log("the items in the ShoppingCart Class", this.items);

    this.items.map(cart => {
      count += cart.quantity;
    });

    return count;
  }
}
