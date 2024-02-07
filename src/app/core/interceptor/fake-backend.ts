﻿import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../models/user';
import { Role } from '../models/role';

const users: User[] = [
  {
    id: 1,
    img: 'assets/images/user/admin.jpg',
    username: 'admin@hospital.org',
    password: 'admin@123',
    firstName: 'Sarah',
    lastName: 'Smith',
    role: Role.Admin,
    token: 'admin-token',
  },
  {
    id: 2,
    img: 'assets/images/user/doctor.jpg',
    username: 'doctor@hospital.org',
    password: 'doctor@123',
    firstName: 'Ashton',
    lastName: 'Cox',
    role: Role.Doctor,
    token: 'doctor-token',
  },
  {
    id: 3,
    img: 'assets/images/user/patient.jpg',
    username: 'patient@hospital.org',
    password: 'patient@123',
    firstName: 'Cara',
    lastName: 'Stevens',
    role: Role.Patient,
    token: 'patient-token',
  },
  {
    id: 4,
    img: 'assets/images/user/admin.jpg',
    username: 'demo@hospital.org',
    password: 'demo@123',
    firstName: 'Super',
    lastName: 'Demo',
    role: Role.Demo,
    token: 'demo-token',
  },
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(handleRoute));

    function handleRoute() {
      switch (true) {
        case url.endsWith('/authenticate') && method === 'POST':
          return authenticate();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { username, password } = body;
      const user = users.find(
        (x) => x.username === username && x.password === password
      );
      if (!user) {
        return error('Username or password is incorrect');
      }
      return ok({
        id: user.id,
        img: user.img,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token: user.token,
      });
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};

