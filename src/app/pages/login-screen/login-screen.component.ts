import { Component } from '@angular/core';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css'],
})
export class LoginScreenComponent {
  isLoginMode: boolean = true;

  handleAuthMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
