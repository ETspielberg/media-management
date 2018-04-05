import {Component, OnInit} from '@angular/core';
import {Principal} from '../model/Principal';
import {Router} from '@angular/router';
import {AuthentificationService} from '../service/authentification.service';
import {FileWithLink} from '../model/FileWithLink';
import {FileService} from '../service/file.service';
import {Message} from 'primeng/primeng';
import {HttpClient} from '@angular/common/http';
/**
 * Created by etspi on 25.06.2017.
 */

@Component({
  selector: 'app-dashboard',
  templateUrl: 'start.component.html'
})
export class StartComponent implements OnInit {

  constructor(private http: HttpClient, private fileService: FileService) {
  }
  msgs: Message[];

  uploadedFiles: any[] = [];

  files: FileWithLink[];

  principal: Principal;

  ngOnInit(): void {
    // this.getAllFiles();
  }

  goTo(url: string) {
    window.location.href = url;
  }

  getAllFiles() {
    this.fileService.listAllFiles('ezbUpload').subscribe(
      res => this.files = res
    );
  }

  runEzbAnalyzer(file: FileWithLink) {
    const url = 'http://localhost:11844/run/ezbAnalyzer?filename=' + file.filename;
    this.http.get(url).subscribe();
  }

  onUpload(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
  }
}
