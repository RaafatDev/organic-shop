import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Product } from "./models/product";
import { VirtualTimeScheduler } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private db: AngularFirestore) {}

  create(product) {
    return this.db.collection("products").add(product);
  }

  getAll() {
    return this.db
      .collection("products")
      .snapshotChanges()
      .pipe(
        map(product => {
          return product.map(p => {
            const data = p.payload.doc.data() as Product;
            const id = p.payload.doc.id;

            return { id, ...data };
          });
        })
      );
  }

  get(productId) {
    return (
      this.db
        .collection("products")
        .doc(productId)
        // .get();
        .snapshotChanges()
        .pipe(
          map(product => {
            return product.payload.data() as Product;
          })
        )
    );
  }

  update(productId, product) {
    return this.db
      .collection("products")
      .doc(productId)
      .update(product);
  }

  delete(productId) {
    return this.db
      .collection("products")
      .doc(productId)
      .delete();
  }
}
