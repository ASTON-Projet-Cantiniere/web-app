import { ToastrService } from 'ngx-toastr';
import { UserService } from '@shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: any;
  public userid:any;

  constructor(
    private authService : AuthService,
    private UserService : UserService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    //récupère l'utilisateur connecté
    this.userid = this.authService.getUser();
    //récupère les données de l'utilisateur connecté
    this.UserService.getUserByID(this.userid.id).subscribe
      (
        (data) => {
          this.user = data;
        },
        (error) => {
          this.toastr.error("Erreur lors de la récupération des données");
        });
  }

}
