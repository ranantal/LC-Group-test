import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User, Address } from '../_models/user';

@Injectable()
export class DataService {
  private filteredUsersSource = new BehaviorSubject<User[]>(null);
  filteredUsers = this.filteredUsersSource.asObservable();;

  constructor() { }

  changeFilteredUsers(filteredUsers: User[]): void {
    this.filteredUsersSource.next(filteredUsers);
  }
}
