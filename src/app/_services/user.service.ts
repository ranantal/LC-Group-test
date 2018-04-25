import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { Address, User } from '../_models/user';

const url = 
"https://gist.githubusercontent.com/bunopus/f48fbb06578003fb521c7c1a54fd906a/raw/e5767c1e7f172c6375f064a9441f2edd57a79f15/test_users.json";

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]>  {
    return this.http.get<User[]>(url);
  }

}
