import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from '../login-screen/auth.service';
import { LoaderService } from 'src/app/components/progress-bar-loader/loader.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css'],
})
export class HomeScreenComponent implements OnInit, OnDestroy {
  private authSubscription: Subscription;
  isLoggedIn: boolean = false;
  loggedInUserId: string = '';
  isLoading: Observable<boolean>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.isLoading = this.loaderService.isLoading;

    this.loaderService.setLoading(true);

    this.authSubscription = this.authService.user.subscribe((user) => {
      this.isLoggedIn = !!user;
      this.loggedInUserId = user?.id;

      this.loaderService.setLoading(false);
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  handleAuthAction() {
    this.loaderService.setLoading(true);

    if (this.isLoggedIn) {
      this.authService.logout();
      this.loaderService.setLoading(false);
    } else {
      this.router.navigate(['/login']);
      this.loaderService.setLoading(false);
    }
  }
}
