import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  failed: boolean

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  async onSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: async (val) => {
        this.failed = false
        await this.router.navigate(['/home'])
      },
      error: (e) => {
        this.failed = true
      }
    })
  }

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

}
