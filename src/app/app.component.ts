import {Component} from '@angular/core';
import {FadeInOut} from '@shared/animations/fade-in-out.animation';
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [FadeInOut]
})
export class AppComponent {
  title = 'La Cantinière';
  private location: string = '';
  public isLoading: boolean = false;

  constructor(public router: Router, public route: ActivatedRoute) {
    this.location = this.router.url;

    this.router.events.subscribe(event => {

      switch (true) {
        case event instanceof NavigationStart: {
          this.isLoading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.isLoading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }
}
