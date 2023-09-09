import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './pages/home-screen/home-screen.component';
import { LoginScreenComponent } from './pages/login-screen/login-screen.component';
import { BlogsListScreenComponent } from './pages/blogs-list-screen/blogs-list-screen.component';
import { ProfileScreenComponent } from './pages/profile-screen/profile-screen.component';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: HomeScreenComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: BlogsListScreenComponent },
      { path: 'blogs', component: BlogsListScreenComponent },
      { path: 'profile', component: ProfileScreenComponent },
    ],
  },
  { path: 'login', component: LoginScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// {
//   path: '',
//   component: HomeScreenComponent,
//   children: [
//     { path: '', redirectTo: '/home', pathMatch: 'full' },
//     { path: 'home', component: BlogsListScreenComponent },
//     { path: 'blogs', component: BlogsListScreenComponent },
//     { path: 'profile', component: ProfileScreenComponent },
//   ],
// },
// { path: 'login', component: LoginScreenComponent },
// ];

// {
//   path: '',
//   component: HomeScreenComponent,
//   pathMatch: 'full',
//   // children: [{ path: 'home', component: BlogsListScreenComponent }],
// },
// { path: 'login', component: LoginScreenComponent },
// { path: 'blogs', component: BlogsListScreenComponent },
// { path: 'profile', component: ProfileScreenComponent },
// ];
