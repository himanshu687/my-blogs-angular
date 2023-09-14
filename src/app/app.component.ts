import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from './pages/login-screen/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  innerHtmlContent: string = '';
  routerEvents: Subscription;

  constructor(private router: Router, private authService: AuthService) {
    this.routerEvents = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.innerHtmlContent = event.url;
      }
    });
  }

  ngOnInit(): void {
    this.authService.autoLogin();
    console.log('github actions deployed');
  }

  ngOnDestroy(): void {
    this.routerEvents.unsubscribe();
  }
}
