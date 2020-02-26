import { Component, OnInit } from "@angular/core";

import { AuthService } from "../auth.service";
import { AppUser } from "../models/app-user";
import { ShoppingCartService } from "../shopping-cart.service";
import { Observable } from "rxjs";
import { ShoppingCart } from "../models/shopping-cart";

@Component({
  selector: "bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.css"]
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  // shoppingCartItemCount: number;
  cart$: Observable<ShoppingCart>;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => (this.appUser = appUser));

    this.cart$ = await this.shoppingCartService.getCart();
    // console.log("the Cart$ in the bs-navbarComponent.ts ", this.cart$);

    // cart$.subscribe(items => {
    //   this.shoppingCartItemCount = 0;
    //   items.map(cart => {
    //     this.shoppingCartItemCount += cart.quantity;
    //   });
    // });
  }

  logout() {
    this.auth.logout();
  }
}
