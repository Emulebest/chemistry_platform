import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogged: boolean
  isLeader: boolean

  title = 'frontend';

  constructor(private auth: AuthService) {

  }

  ngOnInit(): void {
    const authInfo = this.auth.getAuth()
    if (authInfo !== null) {
      this.isLogged = true
      if (authInfo.organization?.leader === authInfo.id) {
        this.isLeader = true
      }
    }
    this.auth.isLoggedSubject.subscribe(val => this.isLogged = val)
    this.auth.isLeader.subscribe(val => this.isLeader = val)
  }

  logout() {
    this.auth.removeAuth()
  }
}
