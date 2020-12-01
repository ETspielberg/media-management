import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as appGlobals from '../app.globals';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {ListFilter} from '../model/ListFilter';

@Injectable()
export class ListfilterService {

  public activeListFilter: ListFilter;

  private listfilterUrl = environment.scriptServerAddress + '/listfilter';

  constructor(private http: HttpClient) {
  }

  listFilters(): Observable<ListFilter[]> {
    return this.http.get<ListFilter[]>(this.listfilterUrl + '/filter/all');
  }

  getListFilter(filter_id: string): Observable<ListFilter> {
    return this.http.get<ListFilter>(this.listfilterUrl + '/filter/' + filter_id);
  }

  saveActiveListfilter(): Observable<ListFilter> {
    return this.http.post<ListFilter>(this.listfilterUrl + '/filter', JSON.stringify(this.activeListFilter), {headers: appGlobals.headers});
  }

  runAnalysis(): Observable<any> {
    return this.http.post(this.listfilterUrl + '/runFilter/' + this.activeListFilter.filter_id, {}, {responseType: 'text'});
  }
}
