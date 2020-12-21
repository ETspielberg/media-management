import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-bubi',
  templateUrl: 'bubi.component.html',
  providers: []
})
export class BubiComponent implements OnInit {

  public almaCoredataUploadUrl: string;


  ngOnInit() {
  this.almaCoredataUploadUrl = environment.almaConnectorAddress + '/bubi/coredata/import';
}
}
