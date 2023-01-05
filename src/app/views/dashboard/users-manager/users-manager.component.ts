import {Component, OnInit} from '@angular/core';
import {UserService} from "@shared/services/user.service";

@Component({
  selector: 'app-users-manager',
  templateUrl: './users-manager.component.html',
  styleUrls: ['./users-manager.component.scss']
})
export class UsersManagerComponent implements OnInit {

  id : number = 0;

  constructor(private userService : UserService) { }

  deleteUser(id:number){
    this.userService.deleteUserByID(id).subscribe((resp:any) => console.log(resp));
  }

  //tableau de user de type UserOut
  users: any[]= [];
  getUsers(){
    this.userService.getUsers().subscribe((resp:any) => this.users = resp);
  }

  getUserById(id: number){
    this.userService.getUserByID(id).subscribe(
      (resp:any) => {
        this.users = [];
        this.users.push(resp);
      }
    )}


  ngOnInit(): void {
  }
}