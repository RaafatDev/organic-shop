import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/category.service";
import { ProductService } from "src/app/product.service";
import { Router, ActivatedRoute } from "@angular/router";
import { pipe } from "rxjs";
import { take } from "rxjs/operators";
import { Product } from "src/app/models/product";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: Product = {
    title: "",
    category: "",
    price: null,
    imageUrl: ""
  };
  id;

  constructor(
    // private productService: ProductService,

    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = this.categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get("id");
    // if (id) this.productService.get(id).subscribe(p => (this.product = p));
    if (this.id)
      this.productService
        .get(this.id)
        .pipe(take(1))
        .subscribe(p => (this.product = p));
    // if (this.id)
    //   this.productService.get(this.id).subscribe(p => console.log(p));
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(["/admin/products"]);
  }

  delete() {
    if (confirm("Are you sure you want to delete this product? ")) {
      this.productService.delete(this.id);
      this.router.navigate(["/admin/products"]);
    }
  }

  ngOnInit() {}
}
