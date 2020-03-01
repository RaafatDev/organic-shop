import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AngularFireModule } from "@angular/fire";
// import { AngularFireDatabaseModule } from "@angular/fire/firestore";
import { AngularFirestoreModule } from "@angular/fire/firestore";
// import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { environment } from "src/environments/environment";
import { BsNavbarComponent } from "./bs-navbar/bs-navbar.component";
import { HomeComponent } from "./home/home.component";
import { ProductsComponent } from "./products/products.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { CheckOutComponent } from "./check-out/check-out.component";
import { OrderSuccessComponent } from "./order-success/order-success.component";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { AdminProductsComponent } from "./admin/admin-products/admin-products.component";
import { AdminOrdersComponent } from "./admin/admin-orders/admin-orders.component";
import { LoginComponent } from "./login/login.component";

import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth-guard.service";
import { UserService } from "./user.service";
import { AdminAuthGuard } from "./admin-auth-guard.service";
import { ProductFormComponent } from "./admin/product-form/product-form.component";
import { CategoryService } from "./category.service";
import { FormsModule } from "@angular/forms";
import { CustomFormsModule } from "ng2-validation";
// import { DataTableModule } from "angular-4-data-table";
// import { DataTableModule } from "angular5-data-table";
// import { DataTableModule } from "angular7-data-table";
import { ProductService } from "./product.service";
import { ProductFilterComponent } from "./products/product-filter/product-filter.component";
import { ProductCardComponent } from "./product-card/product-card.component";
import { ShoppingCartService } from "./shopping-cart.service";
import { ProductQuantityComponent } from "./product-quantity/product-quantity.component";
import { OrderService } from "./order.service";
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    // DataTableModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    // AngularFireStorageModule,
    NgbModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
