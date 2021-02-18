import {Component, OnInit} from '@angular/core';
import {BubiService} from '../service/bubi.service';
import {BubiOrderline} from '../model/bubi/BubiOrderline';
import {ActivatedRoute, Router} from '@angular/router';
import {Bubidata} from '../model/bubi/Bubidata';
import {MessageService} from 'primeng/api';
import {BubiOrder} from '../model/bubi/BubiOrder';
import {TranslateService} from '../translate';

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

  public mode: string;

  public modes = ['active', 'waiting', 'packed', 'sent', 'closed', 'all'];

  public modeSelect = [];

  constructor(private route: ActivatedRoute,
              public bubiService: BubiService,
              private messageService: MessageService,
              private router: Router,
              private translateService: TranslateService) {
  }

  ngOnInit() {
    this.modes.forEach(entry => this.modeSelect.push(
      {
        value: entry,
        desc: this.translateService.instant('bubi.orderline.status.' + entry)
      }
    ));
    this.loading = true;
    this.selectedOrderlines = [];
    this.mode = 'active';
    this.route.queryParams.subscribe(
      params => {
        this.mode = params['mode'];
        if (this.mode === undefined) {
          this.mode = 'active';
        }
        if (this.mode === 'bubi') {
          this.bubi = params['bubi'];
          this.getBubiOrderlines();
        } else {
          this.getOrderlines();
        }
      });
  }

  getOrderlines() {
    this.bubiService.getOrderlines(this.mode).subscribe(
      data => {
        this.orderlines = data;
        this.loading = false;
      },
      error => {
        console.log(error);
        const message = 'Daten konnten nicht abgerufen werden. Bitte Browser-Log auf Fehler prüfen.';
        this.messageService.add({severity: 'error', summary: 'Fehler', detail: message});
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
            console.log(error);
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

  packSelected() {
    this.showDialog = true;
    const bubiOrder = new BubiOrder('', '', 'NEW', 'OPEN', this.selectedOrderlines, '', new Date(), new Date(), 0, new Date(), null, '', new Date());
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
        this.getOrderlines();
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

  getBubiOrderlines() {
    this.bubiService.getBubiOrderlines(this.bubi).subscribe(
      data => {
        this.orderlines = data;
        this.loading = false;
      },
      error => {
        console.log(error);
        const message = 'Daten konnten nicht abgerufen werden. Bitte Browser-Log auf Fehler prüfen.';
        this.messageService.add({severity: 'error', summary: 'Fehler', detail: message});
      }
    );
  }

  edit(bubiOrderline: BubiOrderline) {
    this.bubiService.activeOrderline = bubiOrderline;
    this.router.navigate(['/bubi/orderline'], {
      queryParams: {
        mode: 'identifier',
        identifier: bubiOrderline.bubiOrderLineId
      }
    });
  }

}
