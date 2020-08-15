import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  User: User;

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }
  
  postuser(user: User): Observable<User> {
    return this.http.post<User>(baseURL + 'users/signup' , user)
    .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(baseURL + 'users')
      .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(baseURL + 'users/' + id)
      .pipe(catchError(this.processHTTPMsgService.handlError));
  }

  getUserIds(): Observable<string[] | any> {
    return this.getUsers().pipe(map(users => users.map(user => user._id)))
      .pipe(catchError(error => error));
  }

  deleteUserIds(_id: string) {
    return this.http.delete<User>(baseURL + 'users/' + _id)
      .pipe(catchError(this.processHTTPMsgService.handlError));
  }
  

  putUser(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put<User>(baseURL + 'users/' + user._id, user, httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handlError));
  }
}
