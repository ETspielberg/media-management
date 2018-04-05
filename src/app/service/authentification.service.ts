import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {Principal} from '../model/Principal';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthentificationService {

  constructor(private http: HttpClient) { }

  public principal: Principal;

  updatePrincipal(): Observable<Principal> {
    const observable  = this.http.get<Principal>('/activeuser');
    observable.subscribe(
      data => this.principal = data
    );
    return observable;
  }

  hasRole(role: string): boolean {
    return this.principal.roles && (this.principal.roles.indexOf('ROLE_' + role.toUpperCase()) > -1);
  }

  logout(): Observable<string> {
    return this.http.post('/logout', {}, {responseType: 'text'});
  }
}
