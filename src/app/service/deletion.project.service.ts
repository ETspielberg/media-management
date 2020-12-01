import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as appGlobals from '../app.globals';
import {environment} from '../../environments/environment';
import {DeletionProject} from '../model/DeletionProject';
import {DeletionProjectStatus} from '../model/DeletionProjectStatus';

@Injectable()
export class DeletionProjectService {

  public activeProject: DeletionProject;

  private deletionUrl = environment.scriptServerAddress + '/stockmanagement/deletion';

  constructor(private http: HttpClient) {
  }

  listProjects(): Observable<DeletionProject[]> {
    return this.http.get<DeletionProject[]>(this.deletionUrl + '/projects');
  }

  getProject(project_id: string): Observable<DeletionProject> {
    return this.http.get<DeletionProject>(this.deletionUrl + '/projects/' + project_id);
  }

  saveActiveProject(): Observable<DeletionProject> {
    return this.http.post<DeletionProject>(this.deletionUrl + '/projects', JSON.stringify(this.activeProject), {headers: appGlobals.headers});
  }

  runAnalysis(): Observable<any> {
    return this.http.post(this.deletionUrl + '/runAnalysis/' + this.activeProject.project_id, {}, {responseType: 'text'});
  }

  getBlacklistList(): Observable<string[]> {
    return this.http.get<string[]>(this.deletionUrl + '/blacklistFiles');
  }

  checkSigelScoreList(): Observable<any> {
    return this.http.get(environment.scriptServerAddress + '/stockmanagement/sigellistcheck', {responseType: 'text'});
  }

  checkValidity(projectId: string): Observable<DeletionProject> {
    return this.http.get<DeletionProject>(environment.scriptServerAddress + '/stockmanagement/deletion/projects/checkValidity/' + projectId);
  }

  removeExcelFromProject(projectId: string, filename: string): Observable<DeletionProject> {
    return this.http.delete<DeletionProject>(environment.scriptServerAddress + '/stockmanagement/deletion/projects/removeExcel/' + projectId + '/' + filename);
  }

  getStatus(projectId: string): Observable<DeletionProjectStatus> {
    return this.http.get<DeletionProjectStatus>(environment.scriptServerAddress + '/stockmanagement/deletion/status/' + projectId);
  }

  generateFiles(): Observable<any> {
    return this.http.post(this.deletionUrl + '/generateFiles/' + this.activeProject.project_id, {}, {responseType: 'text'});
  }
}
