import { ShoppingCartItem } from "./shopping-cart-item";

// export interface ShoppingCart {
//   items: ShoppingCartItem[];
// }

export class ShoppingCart {
  // items: ShoppingCartItem[];
  items: ShoppingCartItem[] = [];
  items2: ShoppingCartItem[] = [];

  constructor(public shoppingCartItems: ShoppingCartItem[]) {
    this.shoppingCartItems.map(item => {
      if (item.quantity > 0) {
        this.items.push(new ShoppingCartItem(item.product, item.quantity));
      }
    });

    // console.log("item 222222222222");
    // console.log(this.items2);
    // console.log("item 222222222222");

    // console.log(this.items);
  }
  // constructor(public items: { [key: string]: ShoppingCartItem }) {}

  get products() {
    let productsIn = this.shoppingCartItems.filter(item => {
      return item.quantity > 0;
    });

    console.log({ productsIn });
    return productsIn;
  }

  get totalPrice() {
    let sum = 0;
    this.items.map(item => {
      return (sum += item.totalPrice);
    });
    return sum;
  }

  get totalItemsCount() {
    let count = 0;

    this.shoppingCartItems.map(cart => {
      count += cart.quantity;
    });

    return count;
  }
}
