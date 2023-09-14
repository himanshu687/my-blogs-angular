import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../login-screen/auth.service';
import { Observable, Subscription } from 'rxjs';
import { LoaderService } from 'src/app/components/progress-bar-loader/loader.service';

@Component({
  selector: 'app-profile-screen',
  templateUrl: './profile-screen.component.html',
  styleUrls: ['./profile-screen.component.css'],
})
export class ProfileScreenComponent implements OnInit, OnDestroy {
  loggedInUserEmail: string = '';
  private authSubscription: Subscription;
  isLoading: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.isLoading = this.loaderService.isLoading;
    this.loaderService.setLoading(true);

    this.authSubscription = this.authService.user.subscribe((user) => {
      console.log('getting email');

      this.loggedInUserEmail = user?.email;
      this.loaderService.setLoading(false);
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
