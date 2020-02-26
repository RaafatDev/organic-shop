import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Product } from "./models/product";
import { take, map, switchMap } from "rxjs/operators";
import { ShoppingCartItem } from "./models/shopping-cart-item";
import { Observable, of } from "rxjs";
import { ShoppingCart } from "./models/shopping-cart";

@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  constructor(private db: AngularFirestore) {}

  private create() {
    return this.db.collection("shopping-carts").add({
      dateCreated: new Date().getTime()
    });
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();

    return this.db
      .collection("shopping-carts")
      .doc(cartId)
      .collection("items")
      .snapshotChanges()
      .pipe(
        // switchMap(items => {
        map(items => {
          return items.map(item => {
            // console.log("inside the getCart", item.payload.doc.data());
            // return item.payload.doc.data() as ShoppingCartItem;
            let items = item.payload.doc.data() as ShoppingCartItem;
            // console.log({ items });

            // return new ShoppingCart(items);
            return items;
          });
        }),
        map(x => {
          return new ShoppingCart(x);
        })
      );
  }

  private getItem(cartId: string, productId: string) {
    return this.db
      .collection("shopping-carts")
      .doc(cartId)
      .collection("items")
      .doc(productId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem("cartId");

    if (cartId) return cartId;

    // if we don't have a cart Id then we should create it
    let result = await this.create();
    localStorage.setItem("cartId", result.id);

    return result.id;
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.id);

    item$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe(item => {
        if (item.payload.exists) {
          let data = item.payload.data() as ShoppingCartItem;

          // item$.set(
          item$.update(
            { product: product, quantity: data.quantity + change }
            // { merge: true }
          );
        } else {
          item$.set({ product: product, quantity: 1 });
        }
      });
  }
}
