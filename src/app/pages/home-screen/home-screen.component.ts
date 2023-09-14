import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../login-screen/auth.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css'],
})
export class HomeScreenComponent implements OnInit, OnDestroy {
  // innerHtmlContent: string = '';
  // routerEvents: Subscription;
  private authSubscription: Subscription;
  isLoggedIn: boolean = false;
  loggedInUserId: string = '';

  constructor(private router: Router, private authService: AuthService) {
    // this.routerEvents = this.router.events.subscribe((event: any) => {
    //   if (event instanceof NavigationEnd) {
    //     this.innerHtmlContent = event.url;
    //   }
    // });
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.user.subscribe((user) => {
      this.isLoggedIn = !!user;
      this.loggedInUserId = user?.id;
    });
  }

  ngOnDestroy(): void {
    // this.routerEvents.unsubscribe();
    this.authSubscription.unsubscribe();
  }

  handleAuthAction() {
    if (this.isLoggedIn) {
      this.authService.logout();
    } else {
      this.router.navigate(['/login']);
    }
  }
}
