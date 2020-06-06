import {Component, OnInit} from '@angular/core';
import {DbService} from '../services/db.service';
import {AuthService} from '../services/auth.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-db-manager',
  templateUrl: './db-manager.component.html',
  styleUrls: ['./db-manager.component.css']
})
export class DbManagerComponent implements OnInit {
  dbs: any;
  dbSelected: number[];

  constructor(private dbService: DbService, private authService: AuthService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.dbService.getAll().subscribe(
      val => {
        this.dbs = val;
      }
    );
  }

  makePublic() {
    this.dbService.changeVisibility(this.dbSelected, "public").subscribe()
    for (let db of this.dbs) {
      if (this.dbSelected.includes(db.id)) {
        db.visibility = "public"
      }
    }
  }

  makePrivate() {
    this.dbService.changeVisibility(this.dbSelected, "private").subscribe()
    for (let db of this.dbs) {
      if (this.dbSelected.includes(db.id)) {
        db.visibility = "private"
      }
    }
  }
}
