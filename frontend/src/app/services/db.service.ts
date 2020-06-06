import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {forkJoin} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  dbSelected: number

  constructor(private httpClient: HttpClient) { }

  uploadForm(form: any) {
    const formData = new FormData()
    formData.append("file", form.get('file').value)
    formData.append("name", form.get('name').value)
    formData.append('visibility', form.get('visibility').value)
    formData.append('org', form.get('org').value)

    return this.httpClient.post(`${environment.app_url}/dbs/upload/`, formData)
  }

  getDbs() {
    return this.httpClient.get(`${environment.app_url}/dbs/all/`)
  }

  getAll() {
    return this.httpClient.get(`${environment.app_url}/dbs/manager/`)
  }

  selectDb(db: number) {
    this.dbSelected = db
  }

  changeVisibility(dbs: number[], visibility: string) {
    const results = dbs.map(id => this.httpClient.patch(`${environment.app_url}/dbs/manager/${id}/`, {
      visibility: visibility
    }))
    return forkJoin(results)
  }
}
