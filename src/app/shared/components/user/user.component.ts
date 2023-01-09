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


  users: any[]= [];
  getUsers(){
    this.userService.getUsers().subscribe((resp) => this.users = resp);
  }

  getUserById(id: number){
    this.userService.getUserByID(id).subscribe(
      (resp) => {
        // pour chaque user dans la reponse de l'api si user.status == 2 alors ne pas push dans le tableau
        for (let user of resp) {
          if (user.status == 2) {
            console.log("user.status == 2");
          } else {
            this.users = [];
            this.users.push(resp);
          }
        }
      }
    )
  }

  ngOnInit(): void {
  }

}
