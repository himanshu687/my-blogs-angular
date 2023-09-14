import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {
  //   private loading: boolean = false;
  isLoading = new BehaviorSubject<boolean>(false);

  setLoading(value: boolean) {
    // console.log('setting loader value: ', value);

    this.isLoading.next(value);
  }

  //   getLoadingStatus() {
  //     return this.loading;
  //   }
}
