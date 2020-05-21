import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {concatMap} from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  accountForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl(""),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    org: new FormControl("")
  });

  async onSubmit() {
    this.authService.register(this.accountForm.value).pipe(
      concatMap(user => this.authService.sendOrgJoinRequest({org: this.accountForm.value.org}))
    ).subscribe()
    await this.router.navigate(['/home']);
  }

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

}
