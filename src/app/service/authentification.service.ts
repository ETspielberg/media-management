import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Principal} from '../model/Principal';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {

public principal: Principal;

  constructor(private http: HttpClient) { }

  updatePrincipal(): Observable<boolean> {
    return this.http.get<Principal>(environment.activeuser
    ).pipe(map(
      data => {
        this.principal = data;
        return true;
      },
      error => {
        console.log(error);
        return false;
      }
    ));
  }

  logout(): Observable<string> {
    return this.http.post('/logout', {}, {responseType: 'text'});
  }
}
