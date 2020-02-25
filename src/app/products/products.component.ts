import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "../product.service";
import { CategoryService } from "../category.service";
import { ActivatedRoute } from "@angular/router";
import { Product } from "../models/product";
import { switchMap } from "rxjs/operators";
import { ShoppingCartService } from "../shopping-cart.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  // categories$;
  category: string;
  cart;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService // categoryService: CategoryService
  ) {
    productService
      .getAll()
      .pipe(
        switchMap(products => {
          this.products = products;

          return route.queryParamMap;
        })
      )
      .subscribe(params => {
        this.category = params.get("category");

        this.filteredProducts = this.category
          ? this.products.filter(product => product.category == this.category)
          : this.products;
      });

    // this.categories$ = categoryService.getAll();
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(
      cart => {
        return (this.cart = cart);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
