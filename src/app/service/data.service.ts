/**
 * Created by Eike on 26.06.2017.
 */

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {JournalCounter} from '../model/JournalCounter';
import {Observable} from 'rxjs/Observable';
import {EbookCounter} from '../model/EbookCounter';
import {HttpClient} from '@angular/common/http';
import {DatabaseCounter} from '../model/DatabaseCounter';
import * as appGlobals from '../app.globals';

@Injectable()
export class DataService {
  private journalcounterUrl = appGlobals.dataUrl + '/journalcounter';
  private ebookcounterUrl = appGlobals.dataUrl + '/ebookcounter';
  private databasecounterUrl = appGlobals.dataUrl + '/databasecounter';

  constructor(private http: HttpClient) {
  }

  getAllJournalcounterForIssn(issn: string): Observable<JournalCounter[]> {
    return this.http.get<JournalCounter[]>(
      this.journalcounterUrl + '/search/findByIssn?identifier=' + issn)
      .map(data => data['_embedded']['journalcounter']);
  }

  getAllJournalcounterForJournalcollection(journalcollection: string): Observable<JournalCounter[]> {
    return this.http.get<JournalCounter[]>(
      this.journalcounterUrl + '/search/findByJournalcollection?onlineIssn=' + journalcollection)
      .map(data => data['_embedded']['journalcounter']);
  }

  getAllEbookcounterForIsbn(isbn: string): Observable<EbookCounter[]> {
    return this.http.get<EbookCounter[]>(
      this.ebookcounterUrl + '/search/findByIsbn?onlineIsbn=' + isbn)
      .map(data => data['_embedded']['ebookcounter']);
  }

  getAllDatabasecounterForPlatform(name: string): Observable<DatabaseCounter[]> {
    return this.http.get<DatabaseCounter[]>(
      this.databasecounterUrl + '/search/findByName?name=' + name)
      .map(data => data['_embedded']['databasecounter']);
  }
}
