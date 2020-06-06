import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DbService} from '../services/db.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-db',
  templateUrl: './db.component.html',
  styleUrls: ['./db.component.css']
})
export class DbComponent implements OnInit {
  success: boolean;
  file: any;
  dbs: any;
  dbSelected: number;
  partOfOrg: boolean;

  uploadForm = this.fb.group({
    name: [''],
    visibility: [''],
    org: [''],
    file: [null]
  });
  private isLeader: boolean;

  async onSubmit() {
    const user = this.authService.getAuth();
    this.uploadForm.get('org').setValue(user.organization.name);
    this.dbService.uploadForm(this.uploadForm)
      .subscribe(
        (val) => this.success = true
      );
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.patchValue({
        file: file
      });
      this.uploadForm.get('file').updateValueAndValidity();
    }
  }

  constructor(private dbService: DbService, private authService: AuthService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.authService.user?.organization?.name) {
      this.partOfOrg = true;
    }
    this.authService.partOfOrg.subscribe(val => this.partOfOrg = val);
    const authInfo = this.authService.getAuth()
    if (authInfo !== null) {
      if (authInfo.organization?.leader === authInfo.id) {
        this.isLeader = true
      }
    }
    this.dbService.getDbs().subscribe(
      val => {
        this.dbs = val;
      }
    );
  }

  onNgModelChange($event: any) {
    this.dbService.selectDb($event[0]);
  }
}
