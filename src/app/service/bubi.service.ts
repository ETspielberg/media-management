import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Coredata} from '../model/bubi/Coredata';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import * as appGlobals from '../app.globals';
import {Bubidata} from '../model/bubi/Bubidata';
import {BubiOrderline} from '../model/bubi/BubiOrderline';
import {BubiOrder} from '../model/bubi/BubiOrder';

@Injectable()
export class BubiService {

  private bubidataUrl = environment.almaConnectorAddress + '/bubiData';

  public activeBubidata: Bubidata;

  public activeCoredata: Coredata;

  public activeOrderline: BubiOrderline;

  public activeBubiOrder: BubiOrder;

  public coredataUploadUrl = environment.almaConnectorAddress + '/bubi/coredata/import';

  constructor(private http: HttpClient) {
  }

  getAllCoreData(): Observable<Coredata[]> {
    return this.http.get<Coredata[]>(environment.almaConnectorAddress + '/bubi/coredata/all');
  }

  getActiveCoreData(): Observable<Coredata[]> {
    return this.http.get<Coredata[]>(environment.almaConnectorAddress + '/bubi/coredata/active');
  }

  getAllBubiData(): Observable<Bubidata[]> {
    return this.http.get<Bubidata[]>(environment.almaConnectorAddress + '/bubi/bubidata/all');
  }

  saveCoreData(coredata: Coredata): Observable<Coredata> {
    return this.http.post<Coredata>(environment.almaConnectorAddress + '/bubi/coredata/save', JSON.stringify(coredata), {headers: appGlobals.headers});
  }

  deleteCoredata(coredata: Coredata) {
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
    let params = new HttpParams();
    params = params.append('identifier', identifier);
    return this.http.get<BubiOrderline>(environment.almaConnectorAddress + '/bubi/orderline/fromIdentifier', {params});
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

  getOrderlines(mode: string): Observable<BubiOrderline[]> {
    let params = new HttpParams();
    params = params.append('mode', mode);
    return this.http.get<BubiOrderline[]>(environment.almaConnectorAddress + '/bubi/orderline/retrieve', {params});
  }

  packBubiOrder(bubiOrder: BubiOrder): Observable<BubiOrder> {
    return this.http.post<BubiOrder>(environment.almaConnectorAddress + '/bubi/order/save',
      JSON.stringify(bubiOrder), {headers: appGlobals.headers});
  }

  getBubiOrderlines(bubi: string): Observable<BubiOrderline[]> {
    return this.http.get<BubiOrderline[]>(environment.almaConnectorAddress + '/bubi/orderline/bubi/' + bubi);
  }

  getBubiOrders(mode: string) {
    let params = new HttpParams();
    params = params.append('mode', mode);
    return this.http.get<BubiOrder[]>(environment.almaConnectorAddress + '/bubi/order/retrieve', {params});
  }

  payActiveBubiOrder(): Observable<BubiOrder> {
    return this.http.post<BubiOrder>(environment.almaConnectorAddress + '/bubi/order/pay',
      JSON.stringify(this.activeBubiOrder), {headers: appGlobals.headers});
  }
}
