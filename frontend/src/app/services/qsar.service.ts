import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DbService} from './db.service';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';
import {forkJoin} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QsarService {

  calculate(ant_number: number, iterations: number, y_field: string) {
    const user = this.auth.getAuth()
    const db = this.dbService.dbSelected
    return this.httpClient.post(`${environment.app_url}/qsar/search/`, {
      ant_number,
      iterations,
      y_field,
      db,
      organization: user.organization.name
    })
  }

  getOrgs() {
    return this.httpClient.get(`${environment.app_url}/qsar/orgs/`)
  }

  sendAssignments(org_ids: number[], task_id: number) {
    const results = org_ids.map(id => this.httpClient.post(`${environment.app_url}/qsar/assignments/create/`, {
      assigned_org: id,
      task: task_id
    }))
    return forkJoin(results)
  }

  getAssignments() {
    return this.httpClient.get(`${environment.app_url}/qsar/assignments/`)
  }

  constructor(private httpClient: HttpClient, private dbService: DbService, private auth: AuthService) { }
}
