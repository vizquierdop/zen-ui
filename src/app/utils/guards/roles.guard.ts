import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UsersService } from '../../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class RolesGuard implements CanActivate {
  constructor(private usersService: UsersService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let result = false;
    if (
      localStorage.getItem('zen_userInfo') &&
      route.data['roles'].some((x: number) => {
        return x == JSON.parse(localStorage.getItem('zen_userInfo')!).role;
      })
    ) {
      result = true;
    } else {
      result = false;
      this.router.navigate(['/login']);
    }
    return result;
  }
}
