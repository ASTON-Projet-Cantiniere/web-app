import { UserService } from '@shared/services/user.service';
import { User } from '@shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  userProfileForm!: FormGroup;
  mail: string = "";
  
  constructor(private UserService: UserService, private toaster: ToastrService) { }

  sendmail() {
    this.UserService.sendMailPassword(this.mail).subscribe(
      (data) => {
        this.toaster.success("Un mail vous a été envoyé");
      },
      (error) => {
        this.toaster.error("Erreur lors de l'envoi du mail");
      }
    )
  }

  ngOnInit(): void {
    this.userProfileForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]), 
    }
    );

  }
  
}
