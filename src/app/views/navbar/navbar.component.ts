import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  state: boolean = false;
  navStatus: any = {
    'transform': 'translateX(110%)',
    'display': 'unset'
  }

  public changeNav(){
    if (this.state == false) {
      this.navStatus = {
        'transform': 'translateX(0%)',
        'display': 'unset'
      };
      this.state = true;
    } else {
      this.navStatus = {
        'transform': 'translateX(110%)',
        'display': 'unset'
      };
      this.state = false;
    }
  }
}
