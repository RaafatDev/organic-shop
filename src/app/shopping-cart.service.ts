import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Product } from "./models/product";
import { take, map, switchMap } from "rxjs/operators";
import { ShoppingCartItem } from "./models/shopping-cart-item";
import { Observable, of } from "rxjs";

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
            return item.payload.doc.data();
          });
        })
      );
  }

  //! for reserve before the test !!!!!!!
  // async getCart() {
  //   let cartId = await this.getOrCreateCartId();

  //   return (
  //     this.db
  //       .collection("shopping-carts")
  //       .doc(cartId)
  //       // .collection("items")
  //       .snapshotChanges()
  //       // .()
  //       // .get()
  //       .pipe(
  //         switchMap(col => {
  //           let collectionId = col.payload.id;
  //           console.log("collectionId", collectionId);

  //           // return;
  //           let subColl$ = this.db
  //             .collection("shopping-carts")
  //             .doc(cartId)
  //             .collection("items")
  //             .snapshotChanges();

  //           // console.log("sub", subColl$);

  //           return subColl$;
  //           // return collectionId;
  //         })
  //         // map(subColl => {
  //         //   console.log(
  //         //     "the sub collection in Service",
  //         //     subColl[0].payload.doc.data()
  //         //   );

  //         //   return subColl;
  //         // })
  //       )
  //   );
  // }

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
            { product: product, quantity: data.quantity + 1 }
            // { merge: true }
          );
        } else {
          item$.set({ product: product, quantity: 1 });
        }
      });
  }
}
