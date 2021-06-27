import { Component, OnInit } from '@angular/core';
import {User} from '../../models/users'
import {UsersService} from '../../services/users.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css', '../../styles/table.css']
})
export class AdminComponent implements OnInit {

  constructor(private service : UsersService, private router: Router) { 

  }

  public firstname: string 
  public lastname :string
  public email:string 
  public brand:string

  public userlist : User[]

  ngOnInit(): void {
      this.userlist = this.service.userData;
  }

  createuser()
  {
    this.router.navigate([`${'create'}`]);
  }
  edituser(data : User)
  {
    try 
    { 
      this.service.UpdateUser(data);
      this.router.navigate([`${'update'}`]);

    }

    catch(e)
    {

    }
  }
}
