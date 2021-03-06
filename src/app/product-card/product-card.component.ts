import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../models/product";
import { ShoppingCartService } from "../shopping-cart.service";
import { ShoppingCart } from "../models/shopping-cart";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"]
})
export class ProductCardComponent implements OnInit {
  @Input("product") product: Product;
  @Input("show-actions") showActions = true;
  @Input("shopping-cart") shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {
    // console.log(this.shoppingCart);
  }

  ngOnInit() {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  // removeFromCart() {
  //   // this.cartService.rev
  //   this.cartService.removeFromCart(this.product);
  // }

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
