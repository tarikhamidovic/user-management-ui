import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUserPageRespone } from '../models/app-user-page-reponse.model';
import { AppUser } from '../models/app-user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  private baseUrl = 'http://localhost:8080/api/v1';

  getUsers(pageNumber: number, sortBy?: string): Observable<AppUserPageRespone> {
    const params = sortBy ?
      new HttpParams().set('page', pageNumber).set('sortBy', sortBy) : new HttpParams().set('page', pageNumber)

    return this.http.get<AppUserPageRespone>(`${this.baseUrl}/app-users`, {params: params});
  }

  getUserById(userId: number): Observable<AppUser> {
    return this.http.get<AppUser>(`${this.baseUrl}/app-users/${userId}`);
  }

  updateUser(appUser: AppUser): Observable<AppUser> {
    const userId = appUser.id;
    return this.http.put<AppUser>(`${this.baseUrl}/app-users/${userId}`, appUser);
  }

  deleteUserById(userId: number) {
    return this.http.delete(`${this.baseUrl}/app-users/${userId}`);
  }
}
