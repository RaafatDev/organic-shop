import { Component, OnInit, Input } from "@angular/core";
import { ShoppingCartService } from "../shopping-cart.service";
import { Product } from "../models/product";

@Component({
  selector: "app-product-quantity",
  templateUrl: "./product-quantity.component.html",
  styleUrls: ["./product-quantity.component.css"]
})
export class ProductQuantityComponent {
  @Input("product") product: Product;
  // @Input("show-actions") showActions = true;
  @Input("shopping-cart") shoppingCart;

  constructor(private cartService: ShoppingCartService) {}

  ngOnInit() {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    // this.cartService.rev
    this.cartService.removeFromCart(this.product);
  }

  // getQuantity() {
  //   if (!this.shoppingCart) return 0;

  //   //! #################3
  //   //! #################3
  //   // let item = this.shoppingCart.filter(
  //   //! #########
  //   let item = this.shoppingCart.items.filter(
  //     oneItem => oneItem.product.id === this.product.id
  //   )[0];

  //   return item ? item.quantity : 0;
  // }
}
