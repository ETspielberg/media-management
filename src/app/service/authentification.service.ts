import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';

@Injectable()
export class AuthentificationService {

  constructor(private http: HttpClient) { }

  logout(): Observable<string> {
    return this.http.post('/logout', {}, {responseType: 'text'});
  }
}
