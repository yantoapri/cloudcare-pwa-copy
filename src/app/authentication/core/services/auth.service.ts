import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { User } from '../models/user';
import { User } from 'src/app/authentication/core/models/user'
import { LoginForm } from '../models/login-form';
import { AESService } from 'src/app/private/services/AES/aes'

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private BASE_URL = environment.apiUrl;

	private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;

	constructor(
		private http: HttpClient,
		private aes:AESService
	) {
		this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public get currentUserValue(): User {
		return this.currentUserSubject.value;
	}

	simpanUser(user: any) {
		localStorage.setItem('currentUser', JSON.stringify(user));
		this.currentUserSubject.next(user);
		return true;
	}

	getToken(): string {
		const token = String(localStorage.getItem('token'));
		return token;
	}

	logIn(loginForm: LoginForm): Observable<any> {
		let header = new HttpHeaders({
			'time-login':loginForm.time_login.toString()
		});
		const url = `${this.BASE_URL}auth/login`;
		return this.http.post<User>(url, loginForm,{headers:header});
	}

	signUp(email: string, password: string): Observable<User> {
		const url = `${this.BASE_URL}/register`;
		return this.http.post<User>(url, { email, password });
	}
	switch(param: any): Observable<any> {
		const url = `${this.BASE_URL}auth/switch-akses`;
		return this.http.post<any>(url, param);
	}

	getStatus(): Observable<User> {
		const url = `${this.BASE_URL}/status`;
		return this.http.get<User>(url);
	}

	logout() {
		// remove user from local storage to log user out
		localStorage.removeItem('currentUser');
		localStorage.clear()

		this.currentUserSubject.next(null);
		return of({ success: false });
	}

}
