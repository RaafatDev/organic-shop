import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { ShoppingCartService } from "./shopping-cart.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

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

  getOrders() {
    return this.db
      .collection("orders")
      .snapshotChanges()
      .pipe(
        map(order => {
          return order.map(o => {
            const data = o.payload.doc.data() as any;
            const id = o.payload.doc.id;

            return { id, ...data };
          });
        })
      );
  }

  getOrdersByUser(userId: any) {
    return this.db
      .collection("orders", ref => ref.where("userId", "==", userId))
      .snapshotChanges()
      .pipe(
        map(order => {
          return order.map(o => {
            const data = o.payload.doc.data() as any;
            const id = o.payload.doc.id;

            return { id, ...data };
          });
        })
      );
    // .get()
  }
}
