import { Component, OnInit } from '@angular/core';

import { UserService } from '../_services/user.service';
import { Address, User } from '../_models/user';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  private users: User[];
  filteredUsers: User[];
  
  private genderFilter: string = null;
  genders: Map<string, number>;
  
  private departmentFilter: string = null;
  departments: Map<string, number>;

  private cityFilter: string = null;
  cities: Map<string, number>;

  private sortFlag: number = 1;
  private oldSortArg: string = null;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => { 
        this.users = users;
        this.filteredUsers = users;

        this.filter();
      }
    );
  }

  filter(): void {
    this.genders = new Map();
    this.departments = new Map();
    this.cities = new Map();
    this.filteredUsers = this.users;

    if (this.genderFilter)
      this.filteredUsers = this.filteredUsers.filter(user => {
        return user.gender == this.genderFilter;
      });

    if (this.departmentFilter)
      this.filteredUsers = this.filteredUsers.filter(user => {
        return user.department == this.departmentFilter;
      });

    if (this.cityFilter)
      this.filteredUsers = this.filteredUsers.filter(user => {
        return user.address.city == this.cityFilter;
      });
    
    // count filtered users
    this.filteredUsers.forEach(
      user => {
        if (this.genders[user.gender] === undefined)
          this.genders[user.gender] = 1;
        else
          this.genders[user.gender] += 1;

        if (this.departments[user.department] === undefined)
          this.departments[user.department] = 1;
        else
          this.departments[user.department] += 1;

        if (this.cities[user.address.city] === undefined)
          this.cities[user.address.city] = 1;
        else
          this.cities[user.address.city] += 1;
      }
    );
  }

  getKeys(map: Map<string, number>){
    var arr: string[] = [];

    for (var key in map) {
      arr.push(key);
    }

    return arr;
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

      this.filteredUsers.sort((a, b) => {
        if (a[arg] > b[arg]) return this.sortFlag;
        if (a[arg] < b[arg]) return -this.sortFlag;
      });
    } else {  // custom sorting by Objects
      this.users.sort((a, b) => {
        if (a.address.city + a.address.street > b.address.city + b.address.street) return this.sortFlag;
        if (a.address.city + a.address.street < b.address.city + b.address.street) return -this.sortFlag;
      });

      this.filteredUsers.sort((a, b) => {
        if (a.address.city + a.address.street > b.address.city + b.address.street) return this.sortFlag;
        if (a.address.city + a.address.street < b.address.city + b.address.street) return -this.sortFlag;
      });
    }

    // inverts sotring
    this.sortFlag *= -1;
  }

}
