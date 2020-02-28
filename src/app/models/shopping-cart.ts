import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(private shoppingCartItems: ShoppingCartItem[]) {
    this.shoppingCartItems.map(item => {
      if (item.quantity > 0) {
        this.items.push(new ShoppingCartItem(item.product, item.quantity));
      }
    });
  }

  getQuantity(product: Product) {
    let item = this.shoppingCartItems.filter(
      oneItem => oneItem.product.id === product.id
    )[0];

    return item ? item.quantity : 0;
  }

  // get products() {
  //   let productsIn = this.shoppingCartItems.filter(item => {
  //     return item.quantity > 0;
  //   });

  //   console.log({ productsIn });
  //   return productsIn;
  // }

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
