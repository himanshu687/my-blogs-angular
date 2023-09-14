import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../login-screen/auth.service';
import { Blogs } from './blogs.model';
import { BlogsService } from './blogs.service';

@Component({
  selector: 'app-blogs-list-screen',
  templateUrl: './blogs-list-screen.component.html',
  styleUrls: ['./blogs-list-screen.component.css'],
})
export class BlogsListScreenComponent {
  blogsData: Blogs[] = null;

  constructor(private blogsService: BlogsService) {}

  ngOnInit(): void {
    this.blogsData = [];

    this.blogsService.getAllBlogs().subscribe((data: Blogs[]) => {
      console.log('getting all blogs: ', data);
      this.blogsData = data;
    });
  }

  ngOnDestroy(): void {}
}
