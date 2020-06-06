import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  partOfOrg: boolean

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    if (this.auth.user?.organization?.name) {
      this.partOfOrg = true
    }
    this.auth.partOfOrg.subscribe(val => {
      this.partOfOrg = val !== ""
    })
  }

}
