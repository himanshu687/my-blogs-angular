import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { Blogs } from './blogs.model';
import { BlogsService } from './blogs.service';
import { LoaderService } from 'src/app/components/progress-bar-loader/loader.service';

@Component({
  selector: 'app-blogs-list-screen',
  templateUrl: './blogs-list-screen.component.html',
  styleUrls: ['./blogs-list-screen.component.css'],
})
export class BlogsListScreenComponent {
  blogsData: Blogs[] = [];
  isLoading: Observable<boolean>;

  constructor(
    private blogsService: BlogsService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.isLoading = this.loaderService.isLoading;
    // this.blogsData = [];
    this.loaderService.setLoading(true);

    this.blogsService.getAllBlogs().subscribe((data: Blogs[]) => {
      console.log('getting all blogs: ', data);
      this.blogsData = data;
      this.loaderService.setLoading(false);
    });
  }

  ngOnDestroy(): void {}
}
