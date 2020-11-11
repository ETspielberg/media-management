import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as appGlobals from '../app.globals';
import {EbsProject} from '../model/EbsProject';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class EbsProjectService {

  public activeProject: EbsProject;

  private projectUrl = environment.scriptServerAddress + '/ebs';

  constructor(private http: HttpClient) {
  }

  listProjects(): Observable<EbsProject[]> {
    return this.http.get<EbsProject[]>(this.projectUrl + '/allProjects');
  }

  getProject(project_id: string): Observable<EbsProject> {
    return this.http.get<EbsProject>(this.projectUrl + '/project/' + project_id);
  }

  saveActiveProject(): Observable<EbsProject> {
    return this.http.post<EbsProject>(this.projectUrl + '/new', JSON.stringify(this.activeProject), {headers: appGlobals.headers});
  }

  runAnalysis(): Observable<any> {
    return this.http.post(this.projectUrl + '/runAnalysis/' + this.activeProject.project_id, {}, {responseType: 'text'});
  }
}
