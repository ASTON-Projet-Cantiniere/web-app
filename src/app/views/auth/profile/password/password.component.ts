import { User } from '@shared/models/user.model';
import { UserService } from '@shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  password: string = "";
  passwordConfirm: string = "";
  lastPassword: string = "";
  constructor(private UserService: UserService, private authService : AuthService,private toaster : ToastrService) { }
  user : any;


  //mets à jour le mot de passe
  updatePassword() {
    //vérifie si les deux mots de passe sont identiques
    if (this.password === this.passwordConfirm) {
      this.UserService.checkPassword(this.user.id, this.lastPassword).subscribe(
        (data) => {
          console.log(data);
          //recupère l'utilisateur connecté et met à jour son mot de passe
          this.user.password = this.password;
          this.UserService.patchUpdateUser(this.user.id, this.user).subscribe(
            (data) => {
              console.log(data);
              this.toaster.success("Votre mot de passe a été mis à jour avec succès");
            },
            (error) => {
              this.toaster.error("Erreur lors de la mise à jour du mot de passe");
            },
          )
        },

        //si l'ancien mot de passe est incorrect
        (err) => {
          this.toaster.error("Votre ancien mot de passe est incorrect");
        }
      );
        //si les deux mots de passe ne sont pas identiques
    } else {
      this.toaster.error("Les mots de passe ne correspondent pas");
    }
  }





  ngOnInit(): void {
  this.user = this.authService.getUser();
  }

}
