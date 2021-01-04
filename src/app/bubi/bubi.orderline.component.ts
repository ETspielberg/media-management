import {Component, OnInit} from '@angular/core';
import {BubiService} from '../service/bubi.service';
import {BubiOrderline} from '../model/bubi/BubiOrderline';
import {ActivatedRoute} from '@angular/router';
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

  public bubiList: Bubidata[];

  constructor(private route: ActivatedRoute,
              public bubiService: BubiService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.showForm = false;
    this.route.queryParams.subscribe(
      params => {
        const mode = params['mode'];
        console.log(mode)
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
    console.log(this.barcode);
  }

  saveOrderline() {
    this.bubiService.saveActiveOrderline().subscribe(
      data => {
        this.bubiService.activeOrderline = data;
        const message = 'Der Buchbinderauftrag wurde erfolgreich angelegt. Die Alma-Bestellpostennummer lautet: ' + data.almaPoLineId;
        this.messageService.add({severity: 'success', summary: 'Erfolg', detail: message});
      }
    )

  }

  getFromCoredata() {
    this.bubiService.orderlineFromCoredata().subscribe(
      data => {
        this.bubiService.activeOrderline = data;
        this.showForm = false;
      }
    );

  }

  getFromShelfmark() {
    this.bubiService.orderlineFromShelfmark(this.collection, this.shelfmark).subscribe(
      data => {
        this.bubiService.activeOrderline = data;
        this.showForm = false;
      }
    );
  }
}
