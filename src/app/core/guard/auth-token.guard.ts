import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/authentication/core/services/auth.service'
@Injectable({
  providedIn: 'root'
})
export class AuthTokenGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    if (this.authService.currentUserValue) {
      const userRole = this.authService.currentUserValue.role;
      if ( userRole==undefined) {
        this.router.navigate(['/authentication/signin']);
        return false;
      }

      return true;
    }

    this.router.navigate(['/authentication/signin']);
    return false;
    /**
    let cekToken = String(localStorage.getItem('currentUser'))
    console.log('cekToken', cekToken)
    if (cekToken == null || cekToken == 'null') {
      this.router.navigate(['authentication', 'signin']);
      console.log('cek tidak ada token')
      // this.router.navigate(['role-and-rights', 'tipe-role', 'view'])
      return false;
    }

    return true;
    */
  }

}
