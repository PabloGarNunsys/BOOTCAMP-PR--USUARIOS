import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { UserPaginationResponse } from '../interfaces/userPaginationResponse';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filter: Subject<string> = new Subject<string>();
  private userSearched$: Observable<UserPaginationResponse> = this.filter
  .pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((filter) => {
      return this.usersService.getUsers(0, filter);
    })
  )

  constructor(
    private usersService: UsersService
  ) { }

  public search(filter: string) {
    this.filter.next(filter);
  }
  public get filterSearch() {
    return this.userSearched$;
  }


}
