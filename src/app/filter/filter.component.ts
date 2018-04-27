import { Component, OnInit } from '@angular/core';

import { Address, User } from '../_models/user';
import { DataService } from '../_services/data.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  private users: User[];
  filteredUsers: User[];
  
  private genderFilter: string = null;
  genders: Map<string, number>;
  
  private departmentFilter: string = null;
  departments: Map<string, number>;

  private cityFilter: string = null;
  cities: Map<string, number>;

  constructor(
    private dataService: DataService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
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

    this.dataService.changeFilteredUsers(this.filteredUsers);
  }

  getKeys(map: Map<string, number>){
    var arr: string[] = [];

    for (var key in map) {
      arr.push(key);
    }

    return arr;
  }
}
