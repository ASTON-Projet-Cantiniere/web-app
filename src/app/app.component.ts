import {Component} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'La Cantinière';
  private req: Subscription;
  private location: string = '';

  constructor(public router: Router, public route: ActivatedRoute) {
    this.location = this.router.url;
    this.req = this.router.events.subscribe((val) => {
      if (this.location !== this.router.url) {
        this.location = this.router.url;
        window.scrollTo(0, 0);
      }
    });
  }
}
