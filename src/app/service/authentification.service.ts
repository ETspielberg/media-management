import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {Principal} from '../model/Principal';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthentificationService {

  constructor(private http: HttpClient) { }

  logout(): Observable<string> {
    return this.http.post('/logout', {}, {responseType: 'text'});
  }
}
