import { Component, OnInit } from '@angular/core';
import { Blogs } from '../blogs-list-screen/blogs.model';
import { BlogsService } from '../blogs-list-screen/blogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../login-screen/auth.service';
import { Observable } from 'rxjs';
import { LoaderService } from 'src/app/components/progress-bar-loader/loader.service';

@Component({
  selector: 'app-my-blogs-list-screen',
  templateUrl: './my-blogs-list-screen.component.html',
  styleUrls: ['./my-blogs-list-screen.component.css'],
})
export class MyBlogsListScreenComponent implements OnInit {
  myBlogsData: Blogs[] = [];
  isLoading: Observable<boolean>;

  constructor(
    private blogsService: BlogsService,
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.isLoading = this.loaderService.isLoading;
    // this.myBlogsData = [];
    this.loaderService.setLoading(true);

    this.blogsService.getLoggedInUserBlogs().subscribe((data: Blogs[]) => {
      console.log('getting loggedIn user blogs: ', data);
      this.myBlogsData = data;
      this.loaderService.setLoading(false);
    });
  }

  handleAddBlog() {
    console.log('navigating');
    this.router.navigate(['new-blog'], { relativeTo: this.route });
  }

  handleBlogEdit(blogId: string) {
    this.router.navigate(['edit-blog', blogId], {
      relativeTo: this.route,
    });
  }
}
