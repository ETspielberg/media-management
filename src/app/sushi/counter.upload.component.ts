import { Component, OnInit } from '@angular/core';
import {SushiproviderService} from '../service/sushiprovider.service';
import {HttpClient} from '@angular/common/http';
import * as appGlobals from '../app.globals';
import {FileService} from "../service/file.service";
import {FileWithLink} from "../model/FileWithLink";
import {Message} from "primeng/api";

@Component({
    selector: 'app-counter-upload',
    templateUrl: 'counter.upload.component.html',
    providers: [SushiproviderService]
})
export class CounterUploadComponent implements OnInit {

  uploadedFiles: any[] = [];

  files: FileWithLink[];

  messages: Message[];

    public busy: boolean;

    constructor(private fileService: FileService, private http: HttpClient) {
    }

    ngOnInit(): void {
      this.busy = true;
      this.getAllFiles()
    }

    addCounter(file: FileWithLink) {
      const url =  appGlobals.batchUrl + '/counterbuilder?filename=' + file.filename;
      this.http.get(url).subscribe();
    }

  getAllFiles() {
    this.fileService.listAllFiles('counterbuilder').subscribe(
      res => {
        this.files = res;
        this.busy = false;
      }
    );
  }

  onUpload(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.messages = [];
    this.messages.push({severity: 'info', summary: 'File Uploaded', detail: ''});
  }
}
