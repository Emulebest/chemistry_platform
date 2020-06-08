import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {QsarService} from '../services/qsar.service';
import {DbService} from '../services/db.service';

@Component({
  selector: 'app-qsar',
  templateUrl: './qsar.component.html',
  styleUrls: ['./qsar.component.css']
})
export class QsarComponent implements OnInit {
  formula: string = ''
  dbSelected: boolean

  qsarForm = new FormGroup({
    ant_number: new FormControl(10),
    y_field: new FormControl(''),
    iterations: new FormControl(4),
  });
  orgSelected: number[];
  orgs: any[]
  task_id: number;

  constructor(private qsarService: QsarService, private dbService: DbService) { }

  ngOnInit(): void {
    if (this.dbService.dbSelected) {
      this.dbSelected = true
    }
    this.qsarService.getOrgs().subscribe((orgs: any[]) => {
      console.log(orgs)
      this.orgs = orgs
    })
  }

  onSubmit() {
    this.qsarService.calculate(
      Number.parseInt(this.qsarForm.get("ant_number").value),
      Number.parseInt(this.qsarForm.get("iterations").value),
      this.qsarForm.get("y_field").value,
    ).subscribe((res: any) => {
      this.formula = res.formula
      this.task_id = res.id
    })
  }

  sendAssignments() {
    console.log(this.orgSelected)
    console.log(this.task_id)
    this.qsarService.sendAssignments(this.orgSelected, this.task_id).subscribe()
  }
}
