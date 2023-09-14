import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginScreenComponent } from './pages/login-screen/login-screen.component';
import { HomeScreenComponent } from './pages/home-screen/home-screen.component';
import { BlogsListScreenComponent } from './pages/blogs-list-screen/blogs-list-screen.component';
import { ProfileScreenComponent } from './pages/profile-screen/profile-screen.component';
import { BlogFormScreenComponent } from './pages/blog-form-screen/blog-form-screen.component';
import { AuthService } from './pages/login-screen/auth.service';
import { AuthGuard } from './pages/login-screen/auth.guard';
import { environment } from '../environments/environment';
import { BlogsService } from './pages/blogs-list-screen/blogs.service';
import { MyBlogsListScreenComponent } from './pages/my-blogs-list-screen/my-blogs-list-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    HomeScreenComponent,
    BlogsListScreenComponent,
    ProfileScreenComponent,
    BlogFormScreenComponent,
    MyBlogsListScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    MatProgressBarModule,
  ],
  providers: [AuthService, AuthGuard, BlogsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
