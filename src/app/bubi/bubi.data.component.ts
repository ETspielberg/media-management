import {Component, OnInit} from '@angular/core';
import {Bubidata} from '../model/bubi/Bubidata';
import {BubiService} from '../service/bubi.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-bubi-data',
  templateUrl: 'bubi.data.component.html',
  providers: []
})
export class BubiDataComponent implements OnInit {

  public bubidataList: Bubidata[];

  public busy: boolean;

  public showEditor = false;

  public vendorId: string;

  public campus;

  constructor(private bubiService: BubiService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.busy = true;
    this.campus = [{name: 'Essen', code: 'E0001'}, {name: 'Duisburg', code: 'D0001'}];
    this.bubiService.getAllBubiData().subscribe(
      data => {
        this.bubidataList = data;
        this.busy = false;
      },
      error => {
        console.log(error);
        this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Konnte Stammdaten nicht abrufen.'});
      }
    );
  }

  editBubidata(bubidata: Bubidata) {
    this.bubiService.activeBubidata = bubidata;
    this.showEditor = true;
  }

  saveBubidata(bubidata: Bubidata) {
    this.bubiService.saveBubidata(bubidata).subscribe(data => {
        this.messageService.add({severity: 'success', summary: 'Erfolg', detail: 'Stammdaten wurden gespeichert.'});
      },
      error => {
        console.log(error);
        this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Konnte Stammdaten nicht speichern.'});
      }
    );
  }

  newBubiData() {
    this.bubiService.activeBubidata = new Bubidata('Lieferanten-ID', 'Lieferanten-Account',
      'Name', 'Kurzbezeichnung', '', 15.00, 15.00,
      false);
    this.showEditor = true;
  }
}
