import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@shared/services/auth.service';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  userProfileForm!: FormGroup;

  constructor(private userService : UserService, private authService: AuthService) {

  }
  id: number = 0;

  updateUser() {
    let user = this.authService.getUser();
    if (user) {
      user.name = this.userProfileForm.value.nom;
      user.firstname = this.userProfileForm.value.prenom;
      user.email = this.userProfileForm.value.email;
      user.phone = this.userProfileForm.value.phone;
      console.log(user)
      this.userService.patchUpdateUser(user.id, user).subscribe(
        (data) => {
          if (data && user) {
            this.authService.updateUserInfo(user);
          }
        },
        (error) => {
          console.log(error);
        },

      )
        ;
    }


  }
  ngOnInit(): void {
    this.userProfileForm = new FormGroup({
      nom: new FormControl('',),
      prenom: new FormControl(''),
      email: new FormControl('',[ Validators.required, Validators.email]),
      phone: new FormControl(''),
      sex: new FormControl(''),
    });
  }
}
