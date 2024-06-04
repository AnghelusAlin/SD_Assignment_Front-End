import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/users'; // Base URL for user-related operations
  loggedIn = new EventEmitter<string>();

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAll`).pipe(
      catchError(error => {
        console.error('Error fetching users:', error);
        throw error;
      })
    );
  }

  getBannedUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getBannedUsers`).pipe(
      catchError(error => {
        console.error('Error fetching banned users:', error);
        throw error;
      })
    );
  }

  banUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/banUser`, user).pipe(
      catchError(error => {
        console.error('Error banning user:', error);
        throw error;
      })
    );
  }

  unbanUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/unbanUser`, user).pipe(
      catchError(error => {
        console.error('Error unbanning user:', error);
        throw error;
      })
    );
  }

  insertUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/insertUser`, user).pipe(
      catchError(error => {
        console.error('Error inserting user:', error);
        throw error;
      })
    );
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateUser`, user).pipe(
      catchError(error => {
        console.error('Error updating user:', error);
        throw error;
      })
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteById`, { params: { id: id.toString() } }).pipe(
      catchError(error => {
        console.error('Error deleting user:', error);
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
          this.loggedIn.emit(username);
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
