import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../login-screen/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-screen',
  templateUrl: './profile-screen.component.html',
  styleUrls: ['./profile-screen.component.css'],
})
export class ProfileScreenComponent implements OnInit, OnDestroy {
  loggedInUserEmail: string = '';
  private authSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.user.subscribe((user) => {
      console.log('getting email');

      this.loggedInUserEmail = user?.email;
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
