import { Component, OnInit } from '@angular/core';
import { Blogs } from '../blogs-list-screen/blogs.model';
import { BlogsService } from '../blogs-list-screen/blogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../login-screen/auth.service';

@Component({
  selector: 'app-my-blogs-list-screen',
  templateUrl: './my-blogs-list-screen.component.html',
  styleUrls: ['./my-blogs-list-screen.component.css'],
})
export class MyBlogsListScreenComponent implements OnInit {
  myBlogsData: Blogs[] = null;

  constructor(
    private blogsService: BlogsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.myBlogsData = [];

    this.blogsService.getLoggedInUserBlogs().subscribe((data: Blogs[]) => {
      console.log('getting loggedIn user blogs: ', data);
      this.myBlogsData = data;
    });
  }

  handleAddBlog() {
    console.log('navigating');
    this.router.navigate(['new-blog'], { relativeTo: this.route });
  }

  handleBlogEdit(blogId) {
    // console.log('navigating to edit: ', blog);

    this.router.navigate(['edit-blog', blogId], {
      relativeTo: this.route,
    });
  }
}
