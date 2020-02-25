import { Component, OnInit } from "@angular/core";

import { AuthService } from "../auth.service";
import { AppUser } from "../models/app-user";
import { ShoppingCartService } from "../shopping-cart.service";

@Component({
  selector: "bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.css"]
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartItemCount: number;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => (this.appUser = appUser));

    let cart$ = await this.shoppingCartService.getCart();
    cart$.subscribe(items => {
      this.shoppingCartItemCount = 0;
      items.map(cart => {
        // console.log(typeof cart.quantity);
        // console.log(typeof this.shoppingCartItemCount);

        // console.log(cart.quantity);
        this.shoppingCartItemCount += cart.quantity;
        // console.log(this.shoppingCartItemCount);
      });
    });
  }

  logout() {
    this.auth.logout();
  }
}
