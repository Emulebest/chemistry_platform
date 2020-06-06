import { Component, OnInit } from '@angular/core';
import {OrgRequest} from '../models/account';
import {UserManagementService} from '../services/user-management.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {
  requests: OrgRequest[]
  requests_selected: number[]

  constructor(private manager: UserManagementService) { }

  ngOnInit(): void {
    this.manager.getRequests().subscribe(requests => this.requests = requests)
  }

  sendAcceptance() {
    this.manager.sendAcceptRequests(this.requests_selected).subscribe(res => {
      this.requests = this.requests.filter(req => !res.includes(req.id))
      this.requests_selected = []
    })
  }

}
