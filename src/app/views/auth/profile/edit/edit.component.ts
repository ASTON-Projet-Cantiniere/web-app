import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@shared/services/auth.service';
import { UserService } from '@shared/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  userProfileForm!: FormGroup;

  constructor(private userService : UserService, private authService: AuthService,private toaster : ToastrService, private router : Router) {
  }

  id: any;
  user: any;
  myuser = this.authService.getUser();

  updateUser() {
    if (this.user) {
      if(this.userProfileForm.value.nom !== undefined && this.userProfileForm.value.nom !== ""){
      this.user.name = this.userProfileForm.value.nom;
      }
      if(this.userProfileForm.value.prenom !== undefined && this.userProfileForm.value.prenom !== ""){
      this.user.firstname = this.userProfileForm.value.prenom;
      }
      if(this.userProfileForm.value.email !== undefined && this.userProfileForm.value.email !== ""){
      this.user.email = this.userProfileForm.value.email;
      }
      // if(this.userProfileForm.value.phone !== undefined && this.userProfileForm.value.phone !== ""){
      // this.user.phone = this.userProfileForm.value.phone;
      // }
      // if(this.userProfileForm.value.address !== undefined && this.userProfileForm.value.address !== ""){
      // this.user = this.userProfileForm.value.address;
      // }

      //met à jour l'utilisateur
        this.userService.patchUpdateUser(this.user.id, this.user).subscribe(
          (data) => {
            this.toaster.success("Vos informations ont été mises à jour avec succès");
            this.router.navigate(['/profile']);
            this.authService.updateUserInfo(this.user);
          },
          (error) => {
            this.toaster.error("Erreur lors de la mise à jour des données");
          },
        );
      }
   }

  ngOnInit(): void {
    this.id = this.myuser?.id;
    this.userService.getUserByID(this.id).subscribe(
      (data: any) => {
        this.user = data;
      },
      (error) => {
        console.log(error);
      }
    );

    //initialise le formulaire
    this.userProfileForm = new FormGroup({
      //vérifie que le nom et le prénom ont au moins 3 caractères
      nom: new FormControl('',[Validators.minLength(3)]),
      prenom: new FormControl('',[Validators.minLength(3)]),
      //vérifie que l'email et le numéro de téléphone sont valides
      email: new FormControl('',[Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      // phone: new FormControl('',[Validators.pattern('^[0-9]{10}$')]),
      // adress: new FormControl('',[Validators.minLength(3)]),
    });
  }

}
