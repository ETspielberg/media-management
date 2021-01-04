import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Coredata} from '../model/bubi/Coredata';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import * as appGlobals from '../app.globals';
import {Bubidata} from '../model/bubi/Bubidata';
import {BubiOrderline} from '../model/bubi/bubiOrderline';

@Injectable()
export class BubiService {

  private coredataUrl = environment.almaConnectorAddress + '/coreData';

  private bubidataUrl = environment.almaConnectorAddress + '/bubiData';

  private bubiOrderLineUrl = environment.almaConnectorAddress + '/bubiOrderLine';

  private bubiOrderUrl = environment.almaConnectorAddress + '/bubiOrder';

  public activeBubidata: Bubidata;

  public activeCoredata: Coredata;

  public activeOrderline: BubiOrderline;

  constructor(private http: HttpClient) {
  }

  getAllCoreData(): Observable<Coredata[]> {
    return this.http.get<Coredata[]>(environment.almaConnectorAddress + '/bubi/coredata/all');
  }

  getAllBubiData(): Observable<Bubidata[]> {
    return this.http.get<Bubidata[]>(environment.almaConnectorAddress + '/bubi/bubidata/all');
  }

  saveCoreData(coredata: Coredata): Observable<Coredata> {
    return this.http.post<Coredata>(this.coredataUrl, JSON.stringify(coredata), {headers: appGlobals.headers});
  }

  saveBubidata(bubidata: Bubidata): Observable<Bubidata> {
    return this.http.post<Bubidata>(this.bubidataUrl, JSON.stringify(bubidata), {headers: appGlobals.headers});
  }


  orderlineFromShelfmark(collection: string, shelfmark: string): Observable<BubiOrderline> {
    return this.http.get<BubiOrderline>(this.bubiOrderLineUrl + '/fromShelfmark&shelfmark=' + shelfmark + '&collection=' + collection);
  }

  orderlineFromCoredata(): Observable<BubiOrderline> {
    return this.http.get<BubiOrderline>(this.bubiOrderLineUrl + '/fromShelfmark&shelfmark=' + this.activeCoredata.shelfmark + '&collection=' + this.activeCoredata.collection);
  }
}
