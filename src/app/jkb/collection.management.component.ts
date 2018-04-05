import {Component, OnInit} from '@angular/core';
import {JournalCollection} from '../model/JournalCollection';
import {JournalCollectionService} from '../service/journal.collection.service';
import {FileService} from '../service/file.service';
import {FileWithLink} from '../model/FileWithLink';
import {Message} from 'primeng/api';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-journalcollections',
  templateUrl: 'collection.management.component.html'
})

export class CollectionManagementComponent implements OnInit {

  journalCollections: JournalCollection[];

  files: FileWithLink[];

  uploadedFiles: any[] = [];

  messages: Message[];

  busy: boolean;

  ngOnInit(): void {
    this.getAllCollections();
    this.getAllFiles();
  }

  constructor(private journalCollectionService: JournalCollectionService, private fileService: FileService, private http: HttpClient) {
  }

  getAllCollections() {
    this.journalCollectionService.getAll().subscribe(
      res => this.journalCollections = res
    );
  }

  deleteCollection(journalCollection: JournalCollection) {
    this.journalCollectionService.deleteJournalcollection(journalCollection.id);
  }

  getAllFiles() {
    this.busy = true;
    this.fileService.listAllFiles('counterbuilder').subscribe(
      res => {
        this.files = res;
        this.busy = false;
      },
      error => {
        this.busy = false;
        this.messages = [];
        this.messages.push({
          severity: 'error', summary: 'Could not get Files', detail: error
        });
      }
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
    this.messages = [];
    this.messages.push({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

}
