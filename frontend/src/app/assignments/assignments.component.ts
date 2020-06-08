import { Component, OnInit } from '@angular/core';
import {QsarService} from '../services/qsar.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  assignments: any[];

  constructor(private qsarService: QsarService) {

  }

  ngOnInit(): void {
    this.qsarService.getAssignments().subscribe((assignments: any[]) => {
      console.log(assignments)
      this.assignments = assignments
    })
  }

}
