import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private loginUrl = './../assets/users.json';
  loggedIn = new EventEmitter<string>();
  constructor(private http: HttpClient) { }
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.loginUrl).pipe(
      catchError(error => {
        console.error('Error fetching users:', error);
        throw error;
      })
    );
  }
  login(user: any): Observable<any> {
    return this.getUsers().pipe(
      switchMap(users => {
        const foundUser = users.find(u => u.username === user.username && u.password === user.password);
        if (foundUser) {
          const username = foundUser.username;
          this.loggedIn.emit(username)
          return of({ success: true, user: foundUser });
        } else {
          this.loggedIn.emit('you are not yet logged in');
          return of({ success: false, message: 'Invalid username or password' });
        }
      }),
      catchError(error => {
        console.error('Error during login:', error);
        throw error;
      })
    );
  }
}
