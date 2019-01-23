import {Injectable} from '@angular/core';

import * as appGlobals from '../app.globals';
import {HttpClient} from '@angular/common/http';
import {CounterLog} from '../model/CounterLog';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CounterLogSercvice {
  private counterLogUrl: string = appGlobals.counterUrl + '/counterlog';

  constructor(private http: HttpClient) {
  }

  getCounterLogsForSushiprovider(identifier: string): Observable<CounterLog[]> {
    const url = this.counterLogUrl + '/forSushiprovider?sushiprovider=' + identifier;
    return this.http.get<CounterLog[]>(url);
  }
}
