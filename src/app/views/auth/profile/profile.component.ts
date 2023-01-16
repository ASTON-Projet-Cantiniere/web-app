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

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }
}
