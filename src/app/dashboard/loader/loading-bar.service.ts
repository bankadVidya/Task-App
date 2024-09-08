import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingBarService {

  constructor() { }
  // Start with false to indicate no loading initially
  public loadingSubject = new BehaviorSubject<boolean>(false);
}
