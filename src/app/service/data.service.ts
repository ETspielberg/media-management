/**
 * Created by Eike on 26.06.2017.
 */

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import * as appGlobals from '../app.globals';
import {CounterStats} from '../model/CounterStats';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {
  }

  getCounterStats(identifier: string, aggregator: string, media: string): Observable<CounterStats[]> {
    let url = appGlobals.counterretrievalUrl + '/' +  media + 'counter/stats';
    if (identifier === '') {
      url = url + 'By' + aggregator;
    } else {
      url = url + 'For' + aggregator + '?identifier=' + identifier;
    }
    // const url = '../../assets/data/example_OECD_journalStats.json';
    return this.http.get<CounterStats[]>(url);
  }
}
