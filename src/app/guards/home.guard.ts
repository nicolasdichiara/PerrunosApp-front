/*import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

}
*/

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';

@Injectable({
providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(public storageService: StorageService, public router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
    this.storageService
    .get(AuthConstants.AUTH)
    .then(res => {
    if (res) {
      resolve(true);
    } else {
      this.router.navigate(['login']);
      resolve(false);
    }
    })
    .catch(err => {
      this.router.navigate(['login']);
      resolve(false);
    });
    });
  }

}
