import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoaderService } from 'src/app/components/progress-bar-loader/loader.service';
import { AuthResponseData } from './auth-response.model';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css'],
})
export class LoginScreenComponent implements OnInit {
  isLoginMode: boolean = true;
  authForm: FormGroup;
  errorMsg: string = null;
  isLoading: Observable<boolean>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.isLoading = this.loaderService.isLoading
  }

  handleAuthMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }

    console.log(this.authForm.value);
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    let authObservable: Observable<AuthResponseData>;
    this.loaderService.setLoading(true);

    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }

    authObservable.subscribe(
      (response) => {
        console.log('response: ', response);
        this.authForm.reset();
        this.loaderService.setLoading(false);
        this.router.navigate(['/']);
      },
      (error) => {
        console.log('error: ', error);
        this.errorMsg = error;
        this.loaderService.setLoading(false);
      }
    );
  }
}
