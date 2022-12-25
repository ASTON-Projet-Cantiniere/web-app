import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  state: boolean = false;
  navStatus: any = {
    'visibility': 'hidden',
    // 'height.px': '0',
    'width': '0%'
  }

  
  liens: Lien[] = [
    {
      'nom': 'Home',
      'lien': '/'
    },
    {
      'nom': 'Orders',
      'lien': '/orders'
    },
    {
      'nom': 'Meals',
      'lien': '/meals'
    }
  ]
    
  
  public changeNav(){
    if (this.state == false) {
      this.navStatus = {
        'visibility': 'visible',
        // 'height.vh': '100',
        'width': '60%'
      };
      this.state = true;
    } else {
      this.navStatus = {
        'visibility': 'hidden',
        // 'height.px': '0',
        'width': '0%'
      };
      this.state = false;
    }
  }
}

interface Lien{
  nom: string,
  lien: string
}
