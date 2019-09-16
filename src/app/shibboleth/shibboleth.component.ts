import {Component, OnInit} from '@angular/core';
import {ShibbolethDataService} from '../service/shibboleth.data.service';
import {ShibbolethData} from '../model/ShibbolethData';
import {ConfirmationService, Message} from 'primeng/api';
import {TranslateService} from '../translate';

@Component({
  selector: 'app-shibbolethi',
  templateUrl: 'shibboleth.component.html',
  providers: [ShibbolethDataService]
})
export class ShibbolethComponent implements OnInit {

  shibbolethDataList: ShibbolethData[];

  selectedShibbolethData: ShibbolethData;

  public showDialog = false;

  messages: Message[];

  constructor(private shibbolethDataService: ShibbolethDataService,
              private confirmationService: ConfirmationService,
              private translateService: TranslateService) { }

  ngOnInit() {
    this.shibbolethDataService.getAll().subscribe(
      value => this.shibbolethDataList = value
    );
  }

  createNewShibbolethData() {
    this.selectedShibbolethData = new ShibbolethData('www.example.com',
      '',
      true,
      'entityID',
      'target',
      '', '');
    this.showDialog = true;
  }

  saveShibbolethData() {
    this.shibbolethDataService.saveShibbolethData(this.selectedShibbolethData).subscribe(
      data => this.selectedShibbolethData = data,
      () => this.messages.push({severity: 'info', summary: 'Erfolg', detail: 'die Shibboleth-Daten wurden erfolgreich gespeichert.'})
    );
    this.showDialog = false;
  }

  showDialogForSushiprovider(shibbolethData: ShibbolethData) {
    this.selectedShibbolethData = shibbolethData;
    this.showDialog = true;
  }

  confirmDeletion(shibbolethData: ShibbolethData) {
    this.confirmationService.confirm({
      message: this.translateService.instant('confirm.delete.shibbolethData'),
      accept: () => {
        this.shibbolethDataService.deleteShibbolethData(shibbolethData.host).subscribe(
          () => this.messages = [{severity: 'info', summary: 'Confirmed', detail: 'Sushiprovider deleted'}]
        );
      }
    });
  }

}
