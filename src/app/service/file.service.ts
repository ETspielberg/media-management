import {Injectable} from '@angular/core';
import {FileWithLink} from '../model/FileWithLink';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as appGlobals from '../app.globals';

@Injectable()
export class FileService {

    constructor(private http: HttpClient) {
    }

    listAllFiles(module: string): Observable<FileWithLink[]> {
        return this.http.get<FileWithLink[]>(appGlobals.filesUrl + '/' + module);
    }

    deleteFile(file: FileWithLink, module: string): Observable<boolean> {
      return this.http.delete<boolean>(appGlobals.filesUrl + '/' + module + '/' + file.filename);
    }
}
