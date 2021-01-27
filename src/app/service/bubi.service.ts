import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Coredata} from '../model/bubi/Coredata';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import * as appGlobals from '../app.globals';
import {Bubidata} from '../model/bubi/Bubidata';
import {BubiOrderline} from '../model/bubi/BubiOrderline';
import {BubiOrder} from '../model/bubi/BubiOrder';

@Injectable()
export class BubiService {

  private coredataUrl = environment.almaConnectorAddress + '/coreData';

  private bubidataUrl = environment.almaConnectorAddress + '/bubiData';

  public activeBubidata: Bubidata;

  public activeCoredata: Coredata;

  public activeOrderline: BubiOrderline;

  public activeBubiOrder: BubiOrder;

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
    return this.http.get<BubiOrderline>(environment.almaConnectorAddress + '/bubi/orderline/fromShelfmark?shelfmark=' + shelfmark + '&collection=' + collection);
  }

  orderlineFromBarcode(barcode: string): Observable<BubiOrderline> {
    return this.http.get<BubiOrderline>(environment.almaConnectorAddress + '/bubi/orderline/fromBarcode?barcode=' + barcode);
  }

  orderlineFromIdentifier(identifier: string): Observable<BubiOrderline> {
    return this.http.get<BubiOrderline>(environment.almaConnectorAddress + '/bubi/orderline/fromIdentifier?identifier=' + identifier);
  }

  orderlineFromCoredata(): Observable<BubiOrderline> {
    return this.http.get<BubiOrderline>(environment.almaConnectorAddress +
      '/bubi/orderline/fromShelfmark?shelfmark=' + this.activeCoredata.shelfmark + '&collection=' +
      this.activeCoredata.collection);
  }

  saveActiveOrderline() {
    return this.http.post<BubiOrderline>(environment.almaConnectorAddress + '/bubi/orderline/save',
      JSON.stringify(this.activeOrderline), {headers: appGlobals.headers});
  }

  saveOrderline(orderline: BubiOrderline) {
    return this.http.post<BubiOrderline>(environment.almaConnectorAddress + '/bubi/orderline/save',
      JSON.stringify(orderline), {headers: appGlobals.headers});
  }

  getActiveOrderlines(): Observable<BubiOrderline[]> {
    return this.http.get<BubiOrderline[]>(environment.almaConnectorAddress + '/bubi/orderline/active');
  }

  getSentOrderlines(): Observable<BubiOrderline[]> {
    return this.http.get<BubiOrderline[]>(environment.almaConnectorAddress + '/bubi/orderline/sent');
  }

  getWaitingOrderlines(): Observable<BubiOrderline[]> {
    return this.http.get<BubiOrderline[]>(environment.almaConnectorAddress + '/bubi/orderline/waiting');
  }

  getAllOrderlines(): Observable<BubiOrderline[]> {
    return this.http.get<BubiOrderline[]>(environment.almaConnectorAddress + '/bubi/orderline/all');
  }

  packBubiOrder(bubiOrder: BubiOrder): Observable<BubiOrder> {
    return this.http.post<BubiOrder>(environment.almaConnectorAddress + '/bubi/order/save',
      JSON.stringify(bubiOrder), {headers: appGlobals.headers});
  }

  getBubiOrderlines(bubi: string): Observable<BubiOrderline[]> {
    return this.http.get<BubiOrderline[]>(environment.almaConnectorAddress + '/bubi/orderline/bubi/' + bubi);
  }

  getActiveBubiOrders(): Observable<BubiOrder[]> {
    return this.http.get<BubiOrder[]>(environment.almaConnectorAddress + '/bubi/order/active');
  }

  payActiveBubiOrder(): Observable<BubiOrder> {
    return this.http.post<BubiOrder>(environment.almaConnectorAddress + '/bubi/order/pay',
      JSON.stringify(this.activeBubiOrder), {headers: appGlobals.headers});
  }
}
