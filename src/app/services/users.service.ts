import { Injectable } from '@angular/core';
import {User} from '../models/users'
import userInfo from '../models/userdata'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { 
    this.userData = userInfo;
  }

  public userData = []
  public updateUser : User;

  public fetchData ()
  {
      return this.userData;
  }

  public AddData( user:User)
  {
      this.userData.unshift(user);
  }

  public UpdateUser(user:User)
  {
    this.updateUser = user;
  }

  public fetchUsertoUpdate()
  {
    return this.updateUser;
  }

  public UpdateData(userData)
  {
     this.userData = userData
  }
}
