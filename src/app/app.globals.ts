import {HttpHeaders} from '@angular/common/http';

export const dataUrl = '/api/data';
export const resourcesUrl = '/api/resources';
export const counterUrl = '/api/counterretrieval';
export const filesUrl = '/files';
export const counterretrievalUrl = '/api/counterretrieval';
export const batchUrl = '/services/batch';
export const headers = new HttpHeaders().set('Content-Type', 'application/json');
