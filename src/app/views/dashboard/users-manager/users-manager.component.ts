import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { UserService } from "@shared/services/user.service";
import { User } from "@shared/models/user.model";
import { ReactiveFormsModule } from '@angular/forms'


@Component({
  selector: 'app-users-manager',
  templateUrl: './users-manager.component.html',
  styleUrls: ['./users-manager.component.scss']
})
export class UsersManagerComponent implements OnInit {
  // initialisations des variables
  users: User[] = [];
  id: number = 0;

  constructor(private userService: UserService, private toaster: ToastrService) { }

  //supprimer le utilisateur via son id
  deleteUser(id: number) {
    if(confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      this.userService.deleteUserByID(id).subscribe(
        (resp: any) => {
          this.toaster.success("Utilisateur supprimé");
          this.getUsers();
        },
        (error) => {
          this.toaster.error("Erreur lors de la suppression de l'utilisateur");
        }
      );
    }
  }


  //récupère tous les utilisateurs
  getUsers() {
    this.userService.getUsers().subscribe(
      (resp: any) => {
        this.users = resp;
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].status == 2) {
            this.users.splice(i, 1);
          }
        }
      },
      (error) => {
        this.toaster.error("Erreur lors de la récupération des utilisateurs");
      }
    )
  }

  //récupère un utilisateur via son id
  getUserById(id: number) {
    this.userService.getUserByID(id).subscribe(
      (resp: any) => {
        this.users = [];
        this.users.push(resp);
      },
      (error) => {
        this.toaster.error("Erreur lors de la récupération de l'utilisateur");
      }
    )
  }


  ngOnInit(): void {
    this.getUsers();
  }
}
