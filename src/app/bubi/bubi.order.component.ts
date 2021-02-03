import {Component, OnInit} from '@angular/core';
import {BubiService} from '../service/bubi.service';
import {BubiOrder} from '../model/bubi/BubiOrder';
import {MessageService} from 'primeng/api';
import {TranslateService} from '../translate';

interface City {
  name: string;
  code: string;
}

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

  constructor(public bubiService: BubiService, public messageService: MessageService, private translateService: TranslateService) {
  }

  ngOnInit() {

    this.bubiService.getActiveBubiOrders().subscribe(
      data => this.bubiOrders = data,
      error => this.messageService.add({
        severity: 'error',
        summary: 'Fehler',
        detail: 'Konnte offene Buchbinderaufträge nicht abrufen.'
      })
    );
  }

  confirmPayment(bubiOrder
                   :
                   BubiOrder
  ) {
    this.bubiService.activeBubiOrder = bubiOrder;
    this.showPaymentDialog = true;
  }

  payActiveBubiOrder() {
    if (this.invoiceAmount === this.bubiService.activeBubiOrder.totalAmount) {
      this.bubiService.payActiveBubiOrder().subscribe(
        data => {
          this.bubiService.activeBubiOrder = data;
          this.messageService.add({
            severity: 'success',
            summary: 'Erfolg',
            detail: 'Die Rechnungsposten wurden erstellt und die Rechnung eingetragen.'
          });
        },
        error => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Fehler',
            detail: 'Konnte die Rechnungsposten nicht erstellen.'
          });
        }
      );
    }

  }

  payAndReceiveBubiOrder() {

  }

}
