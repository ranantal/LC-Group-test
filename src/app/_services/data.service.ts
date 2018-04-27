import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User, Address } from '../_models/user';

@Injectable()
export class DataService {
  private filteredUsersSource = new BehaviorSubject<User[]>(null);
  filteredUsers = this.filteredUsersSource.asObservable();;

  private genderFilterSource = new BehaviorSubject<string>("default message");
  genderFilter = this.genderFilterSource.asObservable();
  private departmentFilterSource = new BehaviorSubject<string>("default message");
  departmentFilter = this.departmentFilterSource.asObservable();
  private cityFilterSource = new BehaviorSubject<string>("default message");
  cityFilter = this.cityFilterSource.asObservable();

  constructor() { }

  changeFilteredUsers(filteredUsers: User[]): void {
    this.filteredUsersSource.next(filteredUsers);
  }

  changeGenderFilter(genderFilter: string) :void {
    this.genderFilterSource.next(genderFilter);
  }

  changeDepartmentFilter(departmentFilter: string): void {
    this.departmentFilterSource.next(departmentFilter);
  }

  changeCityFilter(cityFilter: string): void {
    this.cityFilterSource.next(cityFilter);
  }
}
