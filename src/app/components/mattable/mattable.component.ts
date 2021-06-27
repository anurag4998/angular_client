import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/users'
import { UsersService } from '../../services/users.service'
import { Router } from '@angular/router';
import { rowsAnimation, fadeOut, fade, blub } from '../../animations/animation';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-mattable',
  templateUrl: './mattable.component.html',
  styleUrls: ['./mattable.component.css'],
  animations: [rowsAnimation, fadeOut, fade, blub],
})
export class MattableComponent implements OnInit {

  constructor(private service: UsersService, private router: Router) { }
  displayedColumns: string[] = ['First Name', 'Last Name', 'Email ID', 'Brand', "Actions"];
  public userlist: User[] = [];
  public showForm: boolean = false;
  public userToEdit: User;
  public isEditable = false;

  @ViewChild(MatPaginator) paginator: MatPaginator

  ngOnInit(): void {
    this.userlist = this.service.userData;
  }
  
  

  addUser(newArray) {
    this.showForm = false;
    this.userlist = [...newArray];
  }

  updateUser(newArray) {
    this.isEditable = false;
    this.userlist = [...newArray];
  }

  deleteUser(_email: string) {
    let data = this.service.fetchData();
    for (let i = 0; i < data.length; i++) {
      if (data[i].email === _email) {
        data.splice(i, 1);
      }
    }
    this.userlist = [...data]
    this.service.UpdateData(data);
  }

  edituser(user: User) {
    this.service.UpdateUser(user);
    this.isEditable = true;
    this.userToEdit = user;
  }

  addNewUser() {
    this.showForm = !this.showForm;
  }

  handlePage(event)
  {
    console.log(event)
  }
}
