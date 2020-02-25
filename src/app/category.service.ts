import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

export interface Category {
  name: string;
}

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(private db: AngularFirestore) {}

  /*
  getCategories() {
    // return this.db.collection("categories").get();
    return this.db
      .collection("categories", ref => ref.orderBy("name"))
      .get()
      .pipe(
        map(x => {
          return x.docs;
        })
      );
  }
*/

  // categories$: Category[];
  // categories$;
  getAll() {
    return this.db
      .collection("categories")
      .snapshotChanges()
      .pipe(
        map(category => {
          return category.map(c => {
            const data = c.payload.doc.data() as Category;
            const id = c.payload.doc.id;

            return {
              id,
              ...data
            };
          });
        })
      );
  }
  // test$;
  // getCategories() {
  //   return this.db
  //     .collection("categories")
  //     .snapshotChanges()
  //     .pipe(
  //       map(action => {
  //         action.map(a => {
  //           const data = a.payload.doc.data() as Category;
  //           const id = a.payload.doc.id;
  //           this.test$ = { id, ...data };
  //           return { id, ...data };
  //         });
  //         return this.test$;
  //       })
  //     );
  // this.shirtCollection = afs.collection<Shirt>("shirts");
  // // .snapshotChanges() returns a DocumentChangeAction[], which contains
  // // a lot of information about "what happened" with each change. If you want to
  // // get the data and the id use the map operator.
  // this.shirts = this.shirtCollection.snapshotChanges().pipe(
  //   map(actions =>
  //     actions.map(a => {
  //       const data = a.payload.doc.data() as Shirt;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     })
  //   )
  // );
  // }
}
