import { Component, OnInit } from '@angular/core';
import { ErrorModel } from '../../models/error.model';
import { UserOut } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  id : number = 0;

  constructor(private userService : UserService) { }

  deleteUser(id:number){
    this.userService.deleteUserByID(id).subscribe((resp) => console.log(resp));
  }

  //tableau de user de type UserOut
  users: any[]= [];
  getUsers(){
    this.userService.getUsers().subscribe((resp) => this.users = resp);
  }

  getUserById(id: number){
    this.userService.getUserByID(id).subscribe(
      (resp) => {
        this.users = [];
        this.users.push(resp);
      }
    )}

  ngOnInit(): void {
  }

}
