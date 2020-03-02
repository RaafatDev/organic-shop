import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { OrderService } from "../order.service";
import { Order } from "../models/order";
import { ShoppingCart } from "../models/shopping-cart";

// interface Shipping {
//   name: string;
//   addressLine1: string;
//   addressLine2: string;
//   city: string;
// }

@Component({
  selector: "shipping-form",
  templateUrl: "./shipping-form.component.html",
  styleUrls: ["./shipping-form.component.css"]
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input("cart") cart: ShoppingCart;
  shipping: any = {};
  // shipping: Shipping | {} = {};
  // shipping: Shipping;
  userSubscription: Subscription;
  userId: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(
      user => (this.userId = user.uid)
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    // let order = new Order(this.userId, this.shipping, cart);

    let result = await this.orderService.placeOrder(order);
    // console.log({ result });
    // this.shoppingCartService.clearCart();

    this.router.navigate(["/order-success", result.id]);
  }
}
