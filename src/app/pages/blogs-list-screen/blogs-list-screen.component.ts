import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../login-screen/auth.service';
import { BlogsService } from './blogs.service';
import { Blogs } from './blogs.model';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-blogs-list-screen',
  templateUrl: './blogs-list-screen.component.html',
  styleUrls: ['./blogs-list-screen.component.css'],
})
export class BlogsListScreenComponent {
  private authSubscription: Subscription;
  userId: string = '';
  isAuthenticated: boolean = false;
  routerEvents: Subscription;
  routeUrl: string = '';
  readMore: boolean = false;
  blogsData: Blogs[] = null;

  constructor(
    private authService: AuthService,
    private blogsService: BlogsService,
    private router: Router
  ) {
    this.routerEvents = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.routeUrl = event.url;
      }
    });
  }

  ngOnInit(): void {
    this.blogsData = [];

    this.authSubscription = this.authService.user.subscribe((user) => {
      this.userId = user?.id;
      this.isAuthenticated = !!user;
    });

    if (this.routeUrl === '/' || this.routeUrl === '') {
      this.blogsService.getAllBlogs().subscribe((data: Blogs[]) => {
        console.log('getting all blogs: ', data);
        this.blogsData = data;
      });
    } else if (this.routeUrl === '/blogs') {
      this.blogsService.getLoggedInUserBlogs().subscribe((data: Blogs[]) => {
        console.log('getting loggedIn user blogs: ', data);
        this.blogsData = data;
      });
    }
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  handleReadMoreOrLess() {
    this.readMore = !this.readMore;
  }
}
