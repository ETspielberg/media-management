import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Coredata} from '../model/bubi/Coredata';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import * as appGlobals from '../app.globals';
import {Bubidata} from '../model/bubi/Bubidata';

@Injectable()
export class BubiService {

  private coredataUrl = environment.almaConnectorAddress + '/coreData';

  private bubidataUrl = environment.almaConnectorAddress + '/bubiData';

  private bubiOrderLineUrl = environment.almaConnectorAddress + '/bubiOrderLine';

  private bubiOrderUrl = environment.almaConnectorAddress + '/bubiOrder';

  constructor(private http: HttpClient) {
  }

  getAllCoreData(): Observable<Coredata[]> {
    return this.http.get<Coredata[]>(environment.almaConnectorAddress + '/bubi/coredata/all');
  }

  saveCoreData(coredata: Coredata): Observable<Coredata> {
    return this.http.post<Coredata>(this.coredataUrl, JSON.stringify(coredata), {headers: appGlobals.headers});
  }
  getAllBubiData(): Observable<Bubidata[]> {
    return this.http.get<Bubidata[]>(environment.almaConnectorAddress + '/bubi/bubidata/all');
  }
}
