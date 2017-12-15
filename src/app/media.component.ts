import { Component, OnInit } from '@angular/core';
import {Message} from 'primeng/primeng';
import {FileWithLink} from './model/FileWithLink';
import {FileService} from './service/file.service';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})

export class MediaComponent implements OnInit {

  msgs: Message[];

  uploadedFiles: any[] = [];

  files: FileWithLink[];

    constructor(private http: HttpClient, private fileService: FileService) {
    }

    ngOnInit(): void {
        this.getAllFiles();
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
