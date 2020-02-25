import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "src/app/product.service";
import { Observable, Subscription } from "rxjs";
import { Product } from "src/app/models/product";
import { subscribeOn } from "rxjs/operators";

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"]
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  // the products array is for holding all the backup for our application
  products: Product[];
  filteredProducts: Product[];
  // filteredProducts: ProductWithId[];

  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getAll()
      .subscribe(
        products => (this.filteredProducts = this.products = products)
      );

    console.log("the filtered products", this.products);
  }

  filter(query: string) {
    console.log(query);
    this.filteredProducts = query
      ? this.products.filter(p =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
