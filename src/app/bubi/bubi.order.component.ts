import {Component, OnInit} from '@angular/core';
import {BubiService} from '../service/bubi.service';
import {BubiOrder} from '../model/bubi/BubiOrder';
import {MessageService} from 'primeng/api';
import {TranslateService} from '../translate';


@Component({
  selector: 'app-bubi-invoice',
  templateUrl: 'bubi.order.component.html',
  providers: []
})
export class BubiOrderComponent implements OnInit {

  public showForm = true;

  public loading = false;

  public orderId: string;

  public showPaymentDialog = false;

  public isInvoiceComplete = true;

  public invoiceAmount: number;

  public amountsDisagree: boolean;

  public bubiOrders: BubiOrder[];

  public waysOfDistribution = ['distribute', 'adjust', 'single'];

  public wayOfDistribution: string;

  public orderlineToAdjust: string;

  public invoiceNumber: string;

  public distributionOptions = [];

  constructor(public bubiService: BubiService, public messageService: MessageService, private translateService: TranslateService) {
  }

  ngOnInit() {
    this.showPaymentDialog = false;
    this.waysOfDistribution.forEach(entry => this.distributionOptions.push({
      name: this.translateService.instant('bubi.invoice.difference.' + entry),
      value: entry
    }));
    this.bubiService.getBubiOrders('active').subscribe(
      data => this.bubiOrders = data,
      error => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Fehler',
          detail: 'Konnte offene Buchbinderaufträge nicht abrufen.'
        });
      });
  }

  confirmPayment(bubiOrder: BubiOrder) {
    this.bubiService.activeBubiOrder = bubiOrder;
    this.showPaymentDialog = true;
  }

  payActiveBubiOrder() {
    if (this.isInvoiceComplete) {
      this.bubiService.payActiveBubiOrder().subscribe(
        data => {
          this.showPaymentDialog = false;
          this.bubiService.activeBubiOrder = data;
          this.messageService.add({
            severity: 'success',
            summary: 'Erfolg',
            detail: 'Die Rechnungsposten wurden erstellt und die Rechnung eingetragen.'
          });
        },
        error => {
          this.showPaymentDialog = false;
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Fehler',
            detail: 'Konnte die Rechnungsposten nicht erstellen.'
          });
        }
      );
    } else if (this.wayOfDistribution === 'single') {

    }
  }

  payAndReceiveBubiOrder() {
  }

}
