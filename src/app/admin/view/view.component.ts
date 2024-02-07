import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/core/services/auth.service'
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {
  fullName : string = ""

  constructor(
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.fullName = this.authService.currentUserValue.fullname;
  }

}
