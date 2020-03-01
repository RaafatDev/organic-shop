import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { ShoppingCartService } from "./shopping-cart.service";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  constructor(
    private db: AngularFirestore,
    private shoppingCartService: ShoppingCartService
  ) {}

  async placeOrder(order) {
    // console.log(order);

    let result = this.db.collection("orders").add({ ...order });
    // return this.db.collection("orders").add(order);
    this.shoppingCartService.clearCart();

    return result;
  }
}
