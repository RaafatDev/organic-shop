import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { UserService } from "./user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "organic-shop";

  constructor(
    private userService: UserService,
    private auth: AuthService,
    router: Router
  ) {
    auth.user$.subscribe(user => {
      if (user) {
        userService.save(user);

        let returnUrl = localStorage.getItem("returnUrl");
        if (returnUrl) {
          // if there is a value for the returnUrl we want to delete it once we read it
          // so that we use it only once as part of the Authentication process
          localStorage.removeItem("returnUrl");
          router.navigateByUrl(returnUrl);
        }
      }
    });
  }
}
