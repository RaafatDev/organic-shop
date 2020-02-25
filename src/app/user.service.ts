import { Injectable } from "@angular/core";
// import { AngularFireStorage } from "@angular/fire/storage";
import * as firebase from "firebase";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { AppUser } from "./models/app-user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private db: AngularFirestore) {}
  /*
  save(user: firebase.User) {
    this.db
      .collection("users")
      .doc(user.uid)
      .update(
        {
          name: user.displayName,
          // email: user.email
          date: "kkdkkdk"
        },
      );

  }
  */

  save(user: firebase.User) {
    const document = this.db.collection("users").doc(user.uid);
    const userData = {
      name: user.displayName,
      email: user.email
    };
    document
      .update(userData)
      .then(x => console.log("the document was sucessfully updated"))
      .catch(error => {
        console.log("the error message", error);

        document.set(userData);
      });
  }

  get(uid: string): AngularFirestoreDocument<AppUser> {
    return this.db.collection("users").doc(uid);
    // return this.db.doc(uid);
  }
}
