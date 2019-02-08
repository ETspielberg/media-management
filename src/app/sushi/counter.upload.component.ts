import {Component, OnInit} from '@angular/core';
import {SushiproviderService} from '../service/sushiprovider.service';
import {HttpClient} from '@angular/common/http';
import * as appGlobals from '../app.globals';
import {FileService} from '../service/file.service';
import {FileWithLink} from '../model/FileWithLink';
import {Message} from 'primeng/api';

@Component({
  selector: 'app-counter-upload',
  templateUrl: 'counter.upload.component.html',
  providers: [SushiproviderService]
})
export class CounterUploadComponent implements OnInit {

  files: FileWithLink[];

  messages: Message[];

  public busy: boolean;

  public analyzing: boolean;

  error: any;

  constructor(private fileService: FileService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.analyzing = false;
    this.busy = true;
    this.getAllFiles();
  }

  addCounter(file: FileWithLink) {
    this.analyzing = true;
    const url = appGlobals.counterretrievalUrl + '/counterbuilder?filename=' + file.filename;
    this.http.get<any>(url).subscribe(
      data => {
        this.analyzing = false;
      },
      error => {
        this.analyzing = false;
        this.error = error;
      },
      () => {
        this.analyzing = false;
      }
    );
  }

  getAllFiles() {
    this.fileService.listAllFiles('counterbuilder').subscribe(
      data => {
        this.files = data;
        this.busy = false;
      }
    );
  }

  onUpload(event) {
    this.getAllFiles();
    this.messages = [];
    this.messages.push({severity: 'info', summary: 'Datei wurde hochgeladen', detail: ''});
  }

  deleteFile(file: FileWithLink) {
    this.fileService.deleteFile(file, 'counterbuilder').subscribe(
      () => {
        this.messages = [];
        this.messages.push({severity: 'info', summary: 'Datei wurde gelöscht', detail: ''});
        console.log(' file ' + file.filename + ' deleted!');
        this.getAllFiles();
      },
      error => {
        this.messages.push({severity: 'danger', summary: 'Datei konnte nicht gelöscht werden', detail: ''});
        console.log(' file ' + file.filename + ' not deleted!');
      }
    );
  }
}
