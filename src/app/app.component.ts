import {Component} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'La Cantinière';
  private req: Subscription;
  private location: string = '';

  constructor(
    public router: Router,
    public route: ActivatedRoute,
  ) {
    this.location = this.router.url;
    this.req = this.router.events.subscribe((event: any) => {
      if (event) {
        if (router.url !== this.location) {
          this.location = router.url;
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }
      }
    });
  }
}
