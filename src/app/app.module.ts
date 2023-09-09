import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginScreenComponent } from './pages/login-screen/login-screen.component';
import { HomeScreenComponent } from './pages/home-screen/home-screen.component';
import { BlogsListScreenComponent } from './pages/blogs-list-screen/blogs-list-screen.component';
import { ProfileScreenComponent } from './pages/profile-screen/profile-screen.component';

@NgModule({
  declarations: [AppComponent, LoginScreenComponent, HomeScreenComponent, BlogsListScreenComponent, ProfileScreenComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
