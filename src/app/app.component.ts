import { Component, OnInit } from '@angular/core';
import { ClientService } from './services/client.service';
import { AuthService } from './services/auth.service';
import { TemporaryCartService } from './services/temporary-cart.service';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
declare var gtag;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  client: any;
  constructor(
    private clientService: ClientService,
    private authService: AuthService,
    private temporaryCartService: TemporaryCartService,
    router: Router
  ) {
    const navEndEvents = router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    );
    navEndEvents.subscribe((event: NavigationEnd) => {
      gtag('config', 'UA-155265682-1', {
        page_path: event.urlAfterRedirects
      });
    });
  }
  ngOnInit() {
    if (this.authService.isLoggedIn() === true) {
      if (!this.client) {
        this.clientService.getClient().subscribe(
          res => {
            console.log(res);
            this.clientService.updateClient(res);
          },
          err => {
            this.authService.signOut();
            console.log('error in app component getting client');
            console.log(err);
          }
        );
      }
    } else {
      console.log('please login');
      this.temporaryCartService.load();
    }
  }
  onActivate(e) {

    document.body.scrollTop = 0;
  }
}
