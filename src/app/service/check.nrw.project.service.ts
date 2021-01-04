import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as appGlobals from '../app.globals';
import {environment} from '../../environments/environment';
import {CheckNrwProjectStatus} from '../model/CheckNrw/CheckNrwProjectStatus';
import {CheckNrwProject} from '../model/CheckNrw/CheckNrwProject';

@Injectable()
export class CheckNrwProjectService {

  public activeProject: CheckNrwProject;

  private checkNrwUrl = environment.scriptServerAddress + '/stockmanagement/check_nrw';

  constructor(private http: HttpClient) {
  }

  listProjects(): Observable<CheckNrwProject[]> {
    return this.http.get<CheckNrwProject[]>(this.checkNrwUrl + '/projects');
  }

  getProject(project_id: string): Observable<CheckNrwProject> {
    return this.http.get<CheckNrwProject>(this.checkNrwUrl + '/projects/' + project_id);
  }

  saveActiveProject(): Observable<CheckNrwProject> {
    return this.http.post<CheckNrwProject>(this.checkNrwUrl + '/projects', JSON.stringify(this.activeProject),
      {headers: appGlobals.headers});
  }

  runAnalysis(): Observable<any> {
    return this.http.post(this.checkNrwUrl + '/runAnalysis/' + this.activeProject.project_id, {},
      {responseType: 'text'});
  }

  removeExcelFromProject(projectId: string, filename: string): Observable<CheckNrwProject> {
    return this.http.delete<CheckNrwProject>(environment.scriptServerAddress + '/stockmanagement/check_nrw/projects/removeExcel/' + projectId + '/' + filename);
  }

  getStatus(projectId: string): Observable<CheckNrwProjectStatus> {
    return this.http.get<CheckNrwProjectStatus>(environment.scriptServerAddress + '/stockmanagement/check_nrw/status/' + projectId);
  }

  generateFiles(): Observable<any> {
    return this.http.post(this.checkNrwUrl + '/generateFiles/' + this.activeProject.project_id, {}, {responseType: 'text'});
  }
}
