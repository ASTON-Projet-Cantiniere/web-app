import { ToastrService } from 'ngx-toastr';
import { UserService } from '@shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { User } from '@shared/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: any;
  public userid:any;
  
  constructor(private authService : AuthService,private UserService : UserService, private toaster : ToastrService) { }

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
          this.toaster.error("Erreur lors de la récupération des données");
        });
  }

}
