import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as appGlobals from '../app.globals';
import {Observable} from 'rxjs/index';
import {ShibbolethData} from '../model/ShibbolethData';

@Injectable()
export class ShibbolethDataService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<ShibbolethData[]> {
    return this.http.get<ShibbolethData[]>(appGlobals.shibbolethDataUrl + '/all');
  }

  saveShibbolethData(shibbolethData: ShibbolethData): Observable<ShibbolethData> {
    return this.http
      .post<ShibbolethData>(appGlobals.shibbolethDataUrl, JSON.stringify(
        shibbolethData),
        {headers: appGlobals.headers});
  }

  deleteShibbolethData(host: string) {
    const url = appGlobals.shibbolethDataUrl + '/' + host;
    return this.http.delete(url, {headers: appGlobals.headers});
  }
}
