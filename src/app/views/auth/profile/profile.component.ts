import { ToastrService } from 'ngx-toastr';
import { UserService } from '@shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import {User} from "@shared/models/user.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user!: User;

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.user = user;
    }
  }
}
