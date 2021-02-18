import {Component, OnInit} from '@angular/core';
import {Coredata} from '../model/bubi/Coredata';
import {BubiService} from '../service/bubi.service';
import {MenuItem, MessageService} from 'primeng/api';
import {Bubidata} from '../model/bubi/Bubidata';
import {TranslateService} from '../translate';

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

  private mediaTypesValues = ['journal', 'series', 'book'];

  public mediaTypes = [];

  public menuItems: MenuItem[];

  constructor(public bubiService: BubiService, private messageService: MessageService, private translateService: TranslateService) {
  }

  ngOnInit() {
    this.busy = true;
    this.mediaTypesValues.forEach(
      entry => this.mediaTypes.push({name: this.translateService.instant(entry), value: entry}));
    this.bubiService.getActiveCoreData().subscribe(
      data => {
        this.coredataList = data;
        if (this.coredataList.length > 0) {
          this.bubiService.activeCoredata = this.coredataList[0];
        }
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

  loadAllCoreData() {
    this.busy = true;
    this.bubiService.getAllCoreData().subscribe(
      data => {
        this.coredataList = data;
        if (this.coredataList.length > 0) {
          this.bubiService.activeCoredata = this.coredataList[0];
        }
        this.busy = false;
      },
      error => {
        console.log(error);
        this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Konnte Stammdaten nicht abrufen.'});
      }
    );
  }

  saveCoredata(coredata: Coredata) {
    this.bubiService.saveCoreData(coredata).subscribe(data => {
        this.messageService.add({severity: 'success', summary: 'Erfolg', detail: 'Stammdaten wurden gespeichert.'});
        this.showEditor = false;
        this.bubiService.getAllCoreData().subscribe(
          entries => {
            this.coredataList = entries;
            this.busy = false;
          },
          error => {
            console.log(error);
            this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Konnte Stammdaten nicht abrufen.'});
          }
        );
      },
      error => {
        console.log(error);
        this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Konnte Stammdaten nicht speichern.'});
      }
    );
  }

  delete(coredata: Coredata) {
    this.bubiService.deleteCoredata(coredata);
  }

  newCoredata() {
    this.bubiService.activeCoredata = new Coredata('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'journal', '', '', '', false, '', '');
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
