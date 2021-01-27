import {Component, OnInit} from '@angular/core';
import {BubiService} from '../service/bubi.service';
import {BubiOrderline} from '../model/bubi/BubiOrderline';
import {ActivatedRoute, Router} from '@angular/router';
import {Bubidata} from '../model/bubi/Bubidata';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-bubi-orderline-new',
  templateUrl: 'bubi.orderline.component.html',
  providers: []
})
export class BubiOrderlineComponent implements OnInit {

  public collection: string;

  public shelfmark: string;

  public barcode: string;

  public orderline: BubiOrderline;

  public showForm: boolean;

  public loading: boolean;

  public bubiList: Bubidata[];

  public fundList = [{fund: '55510-0-1200', name: 'Bestandserhaltung'}, {fund: '55510-0-1100', name: 'Einband'}];

  public coverList = [
    {
      cover: 'GW', name: 'GW',
    },
    {
      cover: 'GW   ED', name: 'GW   ED',
    },
    {
      cover: 'StmPr', name: 'StmPr',
    },
    {
      cover: 'StoPr', name: 'StoPr',
    },
    {
      cover: 'StoPr  Dbl.a.V', name: 'StoPr  Dbl.a.V',
    },
    {
      cover: 'StoPr  Dbl.u.F', name: 'StoPr  Dbl.u.F',
    }
  ];

  public bindingList = [{binding: 'k', name: 'K'}, {binding: 'f', name: 'F'}];

  constructor(private route: ActivatedRoute,
              private router: Router,
              public bubiService: BubiService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.showForm = false;
    this.loading = true;
    this.route.queryParams.subscribe(
      params => {
        const mode = params['mode'];
        if (mode === undefined) {
          this.showForm = true;
        } else if (mode === 'coredata') {
          this.getFromCoredata();
        } else if (mode === 'shelfmark') {
          this.shelfmark = params['shelfmark'];
          this.collection = params['collection'];
          this.getFromShelfmark();
        } else if (mode === 'barcode') {
          this.barcode = params['barcode'];
          this.getFromBarcode();
        } else if (mode === 'identifier') {
          const id = params['identifier'];
          this.getFromIdentifier(id);
          this.loading = false;
        } else {
          this.collection = '';
          this.shelfmark = '';
          this.showForm = true;
        }
      }
    );
    this.bubiService.getAllBubiData().subscribe(
      bubiData => this.bubiList = bubiData
    );

  }

  getFromBarcode() {
    this.bubiService.orderlineFromBarcode(this.barcode).subscribe(
      data => {
        this.bubiService.activeOrderline = data;
        this.showForm = false;
        this.loading = false;
      }
    );
  }

  getFromIdentifier(identifier: string) {
    this.bubiService.orderlineFromIdentifier(identifier).subscribe(
      data => {
        this.bubiService.activeOrderline = data;
        this.showForm = false;
        this.loading = false;
      }
    );
  }

  saveOrderline() {
    this.bubiService.saveActiveOrderline().subscribe(
      data => {
        this.bubiService.activeOrderline = data;
        const message = 'Der Buchbinderauftrag wurde erfolgreich angelegt. Die Alma-Bestellpostennummer lautet: ' + data.almaPoLineId;
        this.messageService.add({severity: 'success', summary: 'Erfolg', detail: message});
        this.router.navigate(['/bubi/orderlines']);
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Auftrag konnte nicht gespeichert werden'});
        console.log(error);
      }
    );
  }

  getFromCoredata() {
    this.bubiService.orderlineFromCoredata().subscribe(
      data => {
        this.bubiService.activeOrderline = data;
        this.showForm = false;
        this.loading = false;
      }
    );

  }

  getFromShelfmark() {
    this.bubiService.orderlineFromShelfmark(this.collection, this.shelfmark).subscribe(
      data => {
        this.bubiService.activeOrderline = data;
        this.showForm = false;
        this.loading = false;
      }
    );
  }

  reset() {
    this.showForm = true;
    this.bubiService.activeOrderline = null;
  }
}
