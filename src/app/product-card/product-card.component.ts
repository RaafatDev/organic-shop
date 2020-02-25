import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../models/product";
import { ShoppingCartService } from "../shopping-cart.service";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"]
})
export class ProductCardComponent implements OnInit {
  @Input("product") product: Product;
  @Input("show-actions") showActions = true;
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

  getQuantity() {
    if (!this.shoppingCart) return 0;

    // let item;

    // this.shoppingCart.map(oneItem => {
    //   if (oneItem.product.id === this.product.id) {

    //     item = oneItem;
    //   }
    // });
    let item = this.shoppingCart.filter(
      oneItem => oneItem.product.id === this.product.id
    )[0];

    // console.log("item", item);

    return item ? item.quantity : 0;
  }

  //! for reserve before the test !!!!!!!!!
  // getQuantity() {
  //   console.log("shopping cart ", this.shoppingCart);

  //   if (!this.shoppingCart) return 0;

  //   let item;
  //   this.shoppingCart.map(cart => {
  //     let productMapId = cart.payload.doc.data().product.id;
  //     // console.log("test", cart.payload.doc.data().quantity);

  //     if (productMapId === this.product.id) {
  //       item = cart.payload.doc.data();
  //     }
  //   });

  //   return item ? item.quantity : 0;
  // }
}
