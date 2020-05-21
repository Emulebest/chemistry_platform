import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AccountInfo, OrgRequest, User} from '../models/account';
import {switchMap, tap} from 'rxjs/operators';
import {interval, of, Subject} from 'rxjs';
import {UserManagementService} from './user-management.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  partOfOrg: Subject<boolean> = new Subject<boolean>();
  isLoggedSubject = new Subject<boolean>()
  isLeader = new Subject<boolean>()

  getAuth(): User | null {
    const auth = localStorage.getItem('userInfo');
    if (auth !== null) {
      const user = JSON.parse(auth);
      this.user = user;
      return user;
    }
    return null;
  }

  setAuth(user: User) {
    this.user = user;
    localStorage.setItem('userInfo', JSON.stringify({
      id: user.id, username: user.username, password: user.password, organization: user.organization
    }));
    this.isLoggedSubject.next(true)
    if (user.organization?.leader === user.id) {
      this.isLeader.next(true)
    } else {
      this.isLeader.next(false)
    }
  }

  removeAuth() {
    localStorage.removeItem("userInfo")
    this.user = undefined
    this.partOfOrg.next(false)
    this.isLoggedSubject.next(false)
    this.isLeader.next(false)
  }

  login(user: Partial<User>) {
    return this.httpClient.post<User>(`${environment.app_url}/auth/login/`, user).pipe(
      tap(val => {
        this.setAuth({...val, password: user.password})
      })
    );
  }

  fetchUser() {
    if (this.user) {
      return this.httpClient.get<User>(`${environment.app_url}/auth/users/${this.user.id}/`).pipe(
        tap(user => {
          if (user.organization?.name) {
            console.log('Approved');
            this.partOfOrg.next(true);
          }
        })
      );
    } else {
      return of({});
    }
  }

  sendOrgJoinRequest(orgJoinReq: { org: string }) {
    return this.user_management_service.sendOrgJoinRequest(orgJoinReq)
  }

  register(account: AccountInfo) {
    return this.httpClient.post<User>(`${environment.app_url}/auth/users/`, account).pipe(
      tap(val => {
        this.setAuth({...val, password: account.password})
      })
    );
  }

  constructor(private httpClient: HttpClient, private user_management_service: UserManagementService) {
    this.getAuth();
    interval(5000)
      .pipe(
        switchMap(() => this.fetchUser())
      )
      .subscribe((val) => console.log('Polled'));
  }
}
