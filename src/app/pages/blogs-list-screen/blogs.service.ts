import { Injectable, OnDestroy, OnInit } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  collectionSnapshots,
  deleteDoc,
  doc,
  getDoc,
  orderBy,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs';

import { AuthService } from '../login-screen/auth.service';
import { Blogs } from './blogs.model';

@Injectable()
export class BlogsService implements OnInit, OnDestroy {
  // private firestore: Firestore = inject(Firestore);
  // private blogsRef: CollectionReference;

  private authSubscription: Subscription;
  private loggedInUserId: string = '';

  constructor(
    private authService: AuthService,
    private firestore: Firestore,
    private router: Router
  ) {
    this.authSubscription = this.authService.user.subscribe((user) => {
      this.loggedInUserId = user?.id;
    });
  }

  ngOnInit(): void {
    // this.blogsRef = collection(this.firestore, 'blogs');
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  //   SAVE A BLOG
  saveBlog(blogStatus: boolean, blogText: string) {
    const blogFile: Blogs = {
      userId: this.loggedInUserId,
      status: blogStatus,
      timestamp: new Date(),
      blogContent: blogText,
    };

    const blogsRef = collection(this.firestore, 'blogs');

    addDoc(blogsRef, blogFile)
      .then((docRef) => {
        console.log('Blog saved: ', docRef);
        this.router.navigate(['/blogs', this.loggedInUserId]);
      })
      .catch((error) => {
        console.log('error at saving: ', error);
      });
  }

  // get all blogs for all users
  getAllBlogs() {
    const blogsRef = collection(this.firestore, 'blogs');

    const q = query(
      blogsRef,
      orderBy('timestamp', 'desc'),
      where('status', '==', true)
    );

    return collectionSnapshots(q).pipe(this.formatGetBlogs());
  }

  // get blogs for logged in user only
  getLoggedInUserBlogs() {
    const blogsRef = collection(this.firestore, 'blogs');

    const q = query(
      blogsRef,
      orderBy('timestamp', 'desc'),
      where('userId', '==', this.loggedInUserId)
    );

    return collectionSnapshots(q).pipe(this.formatGetBlogs());
  }

  getBlogById(blogId: string) {
    console.log('inside    service');
    const blogsRef = collection(this.firestore, 'blogs');

    return getDoc(doc(blogsRef, blogId))
      .then((response: any) => {
        const data = response._document.data.value.mapValue.fields;

        const blog: Blogs = {
          documentId: response.id,
          userId: data.userId.stringValue,
          status: data.status.booleanValue,
          timestamp: data.timestamp.timestampValue,
          blogContent: data.blogContent.stringValue,
        };
        return blog;
      })
      .catch((error) => {
        return error;
      });
  }

  updateBlog(documentId: string, blogStatus: boolean, blogContent: string) {
    const updatedBlogFile: Blogs = {
      userId: this.loggedInUserId,
      status: blogStatus,
      timestamp: new Date(),
      blogContent: blogContent,
    };

    const blogsRef = collection(this.firestore, 'blogs');

    updateDoc(doc(blogsRef, documentId), updatedBlogFile as object).then(
      (response) => {
        console.log('updated response: ', response);
        this.router.navigate(['/blogs', this.loggedInUserId]);
      }
    );
  }

  deleteBlog(documentId: string) {
    const blogsRef = collection(this.firestore, 'blogs');

    deleteDoc(doc(blogsRef, documentId)).then((response) => {
      console.log('deleted response: ', response);
      this.router.navigate(['/blogs', this.loggedInUserId]);
    });
  }

  // format the blogs while getting
  formatGetBlogs() {
    return map((actions: any[]) => {
      return actions.map((action: any) => {
        const data = action._document.data.value.mapValue.fields;

        const blog: Blogs = {
          documentId: action.id,
          userId: data.userId.stringValue,
          status: data.status.booleanValue,
          timestamp: data.timestamp.timestampValue,
          blogContent: data.blogContent.stringValue,
        };
        return blog;
      });
    });
  }
}
