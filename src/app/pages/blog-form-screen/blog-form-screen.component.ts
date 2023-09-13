import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogsService } from '../blogs-list-screen/blogs.service';

@Component({
  selector: 'app-blog-form-screen',
  templateUrl: './blog-form-screen.component.html',
  styleUrls: ['./blog-form-screen.component.css'],
})
export class BlogFormScreenComponent implements OnInit {
  blogContentForm: FormGroup;

  constructor(private blogsService: BlogsService) {}

  ngOnInit(): void {
    this.blogContentForm = new FormGroup({
      contentText: new FormControl('', [Validators.required]),
      contentStatus: new FormControl(true, [Validators.required]),
    });
  }

  onSubmit() {
    if (!this.blogContentForm.valid) {
      return;
    }

    console.log(this.blogContentForm.value);

    const status = this.blogContentForm.value.contentStatus;
    const text = this.blogContentForm.value.contentText;

    this.blogsService.saveBlog(status, text);

    this.blogContentForm.reset();
  }
}
