import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { RolesResponse } from '../interfaces/rolesResponse';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private url: string = `${environment.url}/roles`;
  constructor(
    private http: HttpClient
  ) { }

  getRoles() {
    return this.http.get<RolesResponse[]>(this.url);
  }


}
