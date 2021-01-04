import {Component, OnInit} from '@angular/core';
import {Coredata} from '../model/bubi/Coredata';
import {BubiService} from '../service/bubi.service';
import {MessageService} from 'primeng/api';
import {Bubidata} from '../model/bubi/Bubidata';

@Component({
  selector: 'app-bubi-coredata',
  templateUrl: 'bubi.coredata.component.html',
  providers: []
})
export class BubiCoredataComponent implements OnInit {

  public coredataList: Coredata[];

  public bubiList: Bubidata[] = [];

  public busy: boolean;

  public showEditor = false;

  constructor(public bubiService: BubiService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.busy = true;
    this.bubiService.getAllCoreData().subscribe(
      data => {
        this.coredataList = data;
        this.busy = false;
      },
      error => {
        console.log(error);
        this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Konnte Stammdaten nicht abrufen.'});
      }
    );
    this.bubiService.getAllBubiData().subscribe(
      bubiData => this.bubiList = bubiData
    );
  }

  editCoredata(coredata: Coredata) {
    this.bubiService.activeCoredata = coredata;
    this.showEditor = true;
  }

  saveCoredata(coredata: Coredata) {
    this.bubiService.saveCoreData(coredata).subscribe(data => {
      this.messageService.add({severity: 'success', summary: 'Erfolg', detail: 'Stammdaten wurden gespeichert.'});
      },
      error => {
        console.log(error);
        this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Konnte Stammdaten nicht speichern.'});
      }
    );
  }

  newCoredata() {
    this.bubiService.activeCoredata = new Coredata('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', false, '', '', '', false, '', '');
    this.showEditor = true;
  }

  fromExisting(coredata: Coredata) {
    this.bubiService.activeCoredata = Object.create(coredata);
    this.bubiService.activeCoredata.collection = '';
    this.bubiService.activeCoredata.shelfmark = '';
    this.bubiService.activeCoredata.comment = '';
    this.showEditor = true;
  }
}
