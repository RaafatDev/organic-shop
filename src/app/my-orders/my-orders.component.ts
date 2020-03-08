import { AuthService } from "./../auth.service";
import { OrderService } from "./../order.service";
import { Component } from "@angular/core";
// import "rxjs/add/operator/switchMap";
import { switchMap, map } from "rxjs/operators";
// import { Observable } from "rxjs";
// import { AngularFirestoreCollection } from "@angular/fire/firestore";

@Component({
  selector: "app-my-orders",
  templateUrl: "./my-orders.component.html",
  styleUrls: ["./my-orders.component.css"]
})
export class MyOrdersComponent {
  // orders$: AngularFirestoreCollection<unknown>;
  orders$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {
    this.orders$ = authService.user$.pipe(
      switchMap(u => orderService.getOrdersByUser(u.uid))
    );
  }
}
