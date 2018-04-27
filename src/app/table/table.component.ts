import { Component, OnInit } from '@angular/core';

import { DataService } from '../_services/data.service';
import { Address, User } from '../_models/user';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  private users: User[];

  private sortFlag: number = 1;
  private oldSortArg: string = null;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.filteredUsers.subscribe(
      users => this.users = users
    )
  }

  // sorts users by argument
  sort(arg: string) {
    // flag to invert sorting
    if (this.oldSortArg !== arg)
      this.sortFlag = 1;
      
    this.oldSortArg = arg;

    if (arg !== 'address') {
      this.users.sort((a, b) => {
        if (a[arg] > b[arg]) return this.sortFlag;
        if (a[arg] < b[arg]) return -this.sortFlag;
      });

      this.users.sort((a, b) => {
        if (a[arg] > b[arg]) return this.sortFlag;
        if (a[arg] < b[arg]) return -this.sortFlag;
      });
    } else {  // custom sorting by Objects
      this.users.sort((a, b) => {
        if (a.address.city + a.address.street > b.address.city + b.address.street) return this.sortFlag;
        if (a.address.city + a.address.street < b.address.city + b.address.street) return -this.sortFlag;
      });

      this.users.sort((a, b) => {
        if (a.address.city + a.address.street > b.address.city + b.address.street) return this.sortFlag;
        if (a.address.city + a.address.street < b.address.city + b.address.street) return -this.sortFlag;
      });
    }

    // inverts sotring
    this.sortFlag *= -1;
  }

}
