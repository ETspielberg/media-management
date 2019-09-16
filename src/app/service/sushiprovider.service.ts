/**
 * Created by Eike on 26.06.2017.
 */

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {Sushiprovider} from '../model/Sushiprovider';
import {HttpClient} from '@angular/common/http';
import * as appGlobals from '../app.globals';

@Injectable()
export class SushiproviderService {
  private sushiproviderUrl: string = appGlobals.counterUrl + '/sushiprovider';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Sushiprovider[]> {
    return this.http.get<Sushiprovider[]>(
      this.sushiproviderUrl + '/all'
    // 'assets/data/example_sushiprovider.json'
    );
  }

  getRunningSushiproviders(): Observable<string[]> {
    return this.http.get<string[]>(this.sushiproviderUrl + '/running');
  }

  getSushiprovider(identifier: String): Observable<Sushiprovider> {
    const url = `${this.sushiproviderUrl}/${identifier}`;
    return this.http.get<Sushiprovider>(url);
  }

  deleteSushiprovider(identifier: string) {
    const url = this.sushiproviderUrl + '/' + identifier;
    return this.http.delete(url, {headers: appGlobals.headers});
  }

  create(sushiprovider: Sushiprovider): Observable<Sushiprovider> {
    return this.http
      .post<Sushiprovider>(this.sushiproviderUrl, JSON.stringify(
        sushiprovider),
        {headers: appGlobals.headers});
  }
}
