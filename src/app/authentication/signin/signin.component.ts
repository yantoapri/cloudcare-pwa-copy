import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { AESService } from 'src/app/private/services/AES/aes'
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../core/states/auth.states';
import * as AuthActions from '../core/states/login/auth.actions';
import { User } from '../core/models/user';
import { LoginForm } from '../core/models/login-form';

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent

  implements OnInit
{
  authForm: FormGroup;
  loading = false;
  error = "";
  hide = true;



  submitted = false;
  user: User = new User();
  errorMessage?: string | null;
  getState: Observable<any>;
  submitBtn?: string;
  isLoadingBtn?: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private aes:AESService,
    private authService: AuthService,
    private store: Store<fromApp.PublicAppState>
  ) {
    // super();
    this.getState = this.store.select('auth');
  }
  login_time=new Date().getTime()
  ngOnInit() {
    this.store.dispatch( AuthActions.clearData() )
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.user = state.user;
      this.submitted = state.submitBtn;
      this.loading = state.isLoadingBtn;
      // this.login_time=state.time_login
    });

    this.authForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });

  }
  get f() {
    return this.authForm.controls;
  }

  adminSet() {
    this.authForm.get("username").setValue("admin@hospital.org");
    this.authForm.get("password").setValue("admin@123");
  }
  doctorSet() {
    this.authForm.get("username").setValue("doctor@hospital.org");
    this.authForm.get("password").setValue("doctor@123");
  }
  patientSet() {
    this.authForm.get("username").setValue("patient@hospital.org");
    this.authForm.get("password").setValue("patient@123");
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";

    if (this.authForm.invalid) {
      this.error = "Username and Password not valid !";
      return;
    }


    // this.store.dispatch(
    //   AuthActions.login_time({payload:new Date().getTime()})
    // );
    setTimeout(() => {
      // let payload:LoginForm
      let iv=(Math.random() + '').substring(2,10) + (Math.random() + '').substring(2,10);
      let iv2=(Math.random() + '').substring(2,10)  + (Math.random() + '').substring(2,10);
      let ivgen=this.aes.generateKey(16,iv)
      let ivgen2=this.aes.generateKey(16,iv2)
      let keyGen=this.aes.getKeygen(this.login_time)
      let key=this.aes.generateKey(16,keyGen)
      let pas=this.aes.encrypt(this.f.password.value,key,ivgen2,128)
      let username=this.aes.encrypt(this.f.username.value,key,ivgen,128)
    
      let payload={
        passakun : pas+''+ivgen2,
        nameakun : username+''+ivgen,
        time_login:this.login_time
      }
      this.store.dispatch(
        AuthActions.login({ payload: payload })
      );
    }, 1000);

  }
}
