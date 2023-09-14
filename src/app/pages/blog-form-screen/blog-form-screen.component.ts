import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Blogs } from '../blogs-list-screen/blogs.model';
import { BlogsService } from '../blogs-list-screen/blogs.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blog-form-screen',
  templateUrl: './blog-form-screen.component.html',
  styleUrls: ['./blog-form-screen.component.css'],
})
export class BlogFormScreenComponent implements OnInit {
  blogContentForm: FormGroup;
  inEditMode: boolean = false;
  blogId: string;

  constructor(
    private blogsService: BlogsService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.blogContentForm = new FormGroup({
      contentText: new FormControl('', [Validators.required]),
      contentStatus: new FormControl(true, [Validators.required]),
    });

    this.route.params.subscribe((params: any) => {
      console.log('params: ', params);
      this.blogId = params.blogId;
      this.inEditMode = !!params.blogId;
    });

    if (this.inEditMode) {
      this.blogsService
        .getBlogById(this.blogId)
        .then((data: Blogs) => {
          console.log('getting blog by id: ', data);

          this.blogContentForm.patchValue({
            contentText: data.blogContent,
            contentStatus: data.status,
          });
        })
        .catch((error) => {
          console.log('error while getting blog by id: ', error);
        });
    }
  }

  onSubmit() {
    if (!this.blogContentForm.valid) {
      return;
    }

    console.log(this.blogContentForm.value);

    const status = this.blogContentForm.value.contentStatus;
    const text = this.blogContentForm.value.contentText;

    if (this.inEditMode) {
      this.blogsService.updateBlog(this.blogId, status, text);
    } else {
      this.blogsService.saveBlog(status, text);
    }

    this.blogContentForm.reset();
  }

  handleGoBack() {
    this.location.back();
  }

  handleDeleteBlog() {
    this.blogsService.deleteBlog(this.blogId);
  }
}
