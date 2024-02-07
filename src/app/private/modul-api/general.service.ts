import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/authentication/core/services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    private authService : AuthService
  ) { }

  getUrlModule(key: string) {
    let array_repo = this.authService.currentUserValue.repo
    let index = array_repo.find((f) => { return f.key_repo == key })
    return index.url_repo
  }

}
