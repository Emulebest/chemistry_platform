import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrgRequest} from '../models/account';
import {environment} from '../../environments/environment';
import {filter, flatMap, map} from 'rxjs/operators';
import {forkJoin} from 'rxjs';

export interface GetRequestResponse {
  result: OrgRequest[]
}

export interface AcceptRequestResponse {
  result: string,
  id: number
}

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private httpClient: HttpClient) { }

  sendAcceptRequests(ids: number[]) {
    const results = ids.map(id => this.httpClient.put<AcceptRequestResponse>(`${environment.app_url}/auth/org_request/${id}/`, {}))
    return forkJoin(results).pipe(
      map(results => results.filter(res => res.result === "Success")),
      map(results => results.map(res => res.id))
    )
  }

  getRequests() {
    return this.httpClient.get<GetRequestResponse>(`${environment.app_url}/auth/org_request/`).pipe(
      map(result => result.result)
    );
  }

  sendOrgJoinRequest(orgJoinReq: { org: string }) {
    return this.httpClient.post(`${environment.app_url}/auth/org_request/`, orgJoinReq);
  }
}
