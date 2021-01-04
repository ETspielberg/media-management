import {Component, OnInit} from '@angular/core';
import {BubiService} from '../service/bubi.service';
import {BubiOrderline} from '../model/bubi/bubiOrderline';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-bubi-orderline-new',
  templateUrl: 'bubi.orderline.new.component.html',
  providers: []
})
export class BubiOrderlineNewComponent implements OnInit {

  public collection: string;

  public shelfmark: string;

  public barcode: string;

  public orderline: BubiOrderline;

  public showForm: boolean;

  constructor(private route: ActivatedRoute,
  private bubiService: BubiService) {}

  ngOnInit() {
    this.showForm = false;
    this.route.queryParams.subscribe(
      params => {
        const mode = params['mode'];
        if (mode === undefined) {
          this.showForm = true;
        } else if (mode === 'coredata') {
          this.getFromCoredata();
        } else if (mode === 'shelfmark') {
          console.log('got shelfmark from request');
          this.shelfmark = params['shelfmark'];
          console.log(params['shelfmark']);
          this.collection = params['collection'];
          console.log(params['collection']);
          this.getFromShelfmark();
        } else if (mode === 'barcode') {
          this.barcode = params['barcode'];
          this.getFromBarcode();
        } else {
          this.showForm = true;
        }
      }
    );
  }

  getFromBarcode() {
    console.log(this.barcode);
  }

  getFromCoredata() {
    this.bubiService.orderlineFromCoredata().subscribe(
      data => this.bubiService.activeOrderline = data
    );

  }

  getFromShelfmark() {
    this.bubiService.orderlineFromShelfmark(this.collection, this.shelfmark).subscribe(
      data => this.bubiService.activeOrderline = data
    );
  }
}
