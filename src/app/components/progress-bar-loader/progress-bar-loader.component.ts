import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-progress-bar-loader',
  templateUrl: './progress-bar-loader.component.html',
  styleUrls: ['./progress-bar-loader.component.css'],
})
export class ProgressBarLoaderComponent implements OnInit {
  isLoading: Observable<boolean>;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    // this.loaderService.loading.subscribe((value) => {
    //   console.log('loading status: ', value);
    // });|

    this.isLoading = this.loaderService.isLoading;
  }
}
