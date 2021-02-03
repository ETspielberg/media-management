import {Component, OnInit} from '@angular/core';
import {BubiService} from '../service/bubi.service';
import {BubiOrderline} from '../model/bubi/BubiOrderline';
import {ActivatedRoute, Router} from '@angular/router';
import {Bubidata} from '../model/bubi/Bubidata';
import {MessageService} from 'primeng/api';
import {BubiOrder} from '../model/bubi/BubiOrder';

@Component({
  selector: 'app-bubi-orderline-overview',
  templateUrl: 'bubi.orderline.overview.component.html',
  providers: []
})
export class BubiOrderlineOverviewComponent implements OnInit {

  public orderlines: BubiOrderline[];

  public selectedOrderlines: BubiOrderline[];

  public loading: boolean;

  public bubi: string;

  public selectedPrice: number;

  public showDialog = false;

  constructor(private route: ActivatedRoute,
              public bubiService: BubiService,
              private messageService: MessageService,
              private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.selectedOrderlines = [];
    this.route.queryParams.subscribe(
      params => {
        const mode = params['mode'];
        if (mode === undefined) {
          this.getActiveOrderlines();
        } else if (mode === 'active') {
          this.getActiveOrderlines();
        } else if (mode === 'all') {
          this.getAllOrderlines();
        } else if (mode === 'waiting') {
          this.getAllWaitingOrderlines();
        } else if (mode === 'sent') {
          this.getAllSentOrderlines();
        } else if (mode === 'bubi') {
          this.bubi = params['bubi'];
          this.getBubiOrderlines(this.bubi);
        } else {
          this.getActiveOrderlines();
        }
      }
    );
  }

  getAllWaitingOrderlines() {
    this.bubiService.getWaitingOrderlines().subscribe(
      data => {
        this.orderlines = data;
        this.loading = false;
      }
    );
  }

  setWaiting() {
    let successfull = 0;
    this.selectedOrderlines.forEach(
      entry => {
        entry.status = 'WAITING';
        this.bubiService.saveOrderline(entry).subscribe(
          data => successfull = successfull + 1,
          error => {
            const message = 'Auftrag konnte nicht verarbeitet werden: ' + entry.bubiOrderLineId;
            this.messageService.add({severity: 'error', summary: 'Fehler', detail: message});
          }
        );
      }
    );
    if (successfull > 0) {
      const message = successfull + ' von ' + this.selectedOrderlines.length + ' Aufträge wurden erfolgreich bearbeitet';
      this.messageService.add({severity: 'success', summary: 'Fehler', detail: message});
      this.selectedOrderlines = [];
    }
  }

  calculateSelectedPrice() {
    this.selectedPrice = 0;
    this.selectedOrderlines.forEach(
      entry => this.selectedPrice = this.selectedPrice + entry.price
    );
  }

  getAllSentOrderlines() {
    this.bubiService.getSentOrderlines().subscribe(
      data => {
        this.orderlines = data;
        this.loading = false;
      }
    );
  }

  getActiveOrderlines() {
    this.bubiService.getActiveOrderlines().subscribe(
      data => {
        this.orderlines = data;
        this.loading = false;
      }
    );
  }

  packSelected() {
    this.showDialog = true;
    const bubiOrder = new BubiOrder('', '', 'NEW', 'OPEN', this.selectedOrderlines, '', new Date(), new Date(), 0, new Date(), null);
    this.bubiService.packBubiOrder(bubiOrder).subscribe(
      data => {
        this.messageService.add({
          severity: 'success',
          summary: 'Erfolg',
          detail: 'Die Bestellposten wurden erfolgreich gepackt.'
        });
        this.showDialog = false;
        this.selectedOrderlines = [];
        this.bubiService.activeBubiOrder = data;
        this.getActiveOrderlines();
      }, error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Fehler',
          detail: 'Die Bestellposten konnten nicht erfolgreich gepackt werden.'
        });
        this.showDialog = false;
        console.log(error);
      }
    );
  }

  getAllOrderlines() {
    this.bubiService.getAllOrderlines().subscribe(
      data => {
        this.orderlines = data;
        this.loading = false;
      }
    );
  }

  getBubiOrderlines(bubi: string) {
    this.bubiService.getBubiOrderlines(bubi).subscribe(
      data => {
        this.orderlines = data;
        this.loading = false;
      }
    );
  }

  edit(bubiOrderline: BubiOrderline) {
    this.bubiService.activeOrderline = bubiOrderline;
    this.router.navigate(['/bubi/orderline'], {queryParams: {mode: 'identifier', identifier: bubiOrderline.bubiOrderLineId}});
  }

}
