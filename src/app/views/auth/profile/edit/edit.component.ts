import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { User } from '@shared/models/user.model';
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
    let myuser = this.authService.getUser();
    if (myuser) {
      myuser.name = this.userProfileForm.value.nom;
      myuser.firstname = this.userProfileForm.value.prenom;
      myuser.email = this.userProfileForm.value.email;
      myuser.phone = this.userProfileForm.value.phone;
      console.log(myuser)
      this.userService.patchUpdateUser(myuser.id, myuser).subscribe(
        (data) => {
          this.authService.emitUserState(myuser?.token);
          console.log(data);
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
