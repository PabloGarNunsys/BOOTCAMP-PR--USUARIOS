import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { UserPaginationResponse } from '../interfaces/userPaginationResponse';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../interfaces/User';
import { UserResponse } from '../interfaces/usersResponse';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url: string = `${environment.url}/users`;

  constructor(
    private http: HttpClient
  ) { }
  
  getUsers(page = 0, filter?: string) {
    
    const params = new HttpParams()
      .set('page', page)
      .set('size', 10)
      .set('filter', (filter) ? filter : "");
    return this.http.get<UserPaginationResponse>(this.url, {
      params: params
    });

  }

  getUserById(id: string) {
    return this.http.get<UserResponse>(`${this.url}/${id}`);
  }

  createUser(user: User) {
    return this.http.post<UserResponse>(`${this.url}/new`, user);
  }

  updateUserById(user: User, id: string) {
    return this.http.patch<UserResponse>(this.url, {
      ...user,
      id: id
    })
  }

  deleteUserById(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
