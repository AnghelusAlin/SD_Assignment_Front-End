import {Injectable} from "@angular/core";
import {UserService} from "./services/user.service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {UserModel} from "./entities/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.isLoggedIn().pipe(
      map(loggedIn => {
        if (loggedIn) {
          let user : UserModel  = this.userService.currentUser
          if(user.banned){
            return false
          }else{
            return true;
          }
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
