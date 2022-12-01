import { Component, OnInit} from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private req?: Subscription;

  public headerItems: any = [
    { title: 'About', id: 'about', route: '/about' },
    {
      title: 'Profile',
      id: 'profile',
      route: '/profile',
      sub_routes: [
        {
          title: "Account Settings",
          id: 'account-settings',
          route: '/profile'
        },
      ]

    },
  ];

  public loggedInCustomer: any;
  public loggedInClient: any;
  public location: any;

  constructor(private router:Router,
    private activatedRoute: ActivatedRoute) {

    this.location = this.router.url;

    this.req = this.router.events.subscribe((event: any) => {
      this.location = this.router.url;
    });
  }

  ngOnInit(): void  {
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }
}
