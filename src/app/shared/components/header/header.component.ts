import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isAuthenticated: boolean = true;
  public isAdmin: boolean = true;

  constructor() {
  }

  ngOnInit(): void  {
  }

  ngOnDestroy(): void {
  }

  logout() {
    this.isAuthenticated = false;
  }

  toggleMenu() {

  }
}
