import {EventEmitter, Injectable} from "@angular/core";
import {catchError, map, switchMap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users';
  loggedIn = new EventEmitter<string>();
  currentUser: any;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAll`).pipe(
      catchError(this.handleError)
    );
  }

  // Other methods...

  login(user: any): Observable<any> {
    return this.getUsers().pipe(
      switchMap(users => {
        const foundUser = users.find(u => u.username === user.username && u.password === user.password);
        if (foundUser) {
          this.currentUser = foundUser;
          const username = foundUser.username;
          this.loggedIn.emit(username);
          return of({ success: true, user: foundUser });
        } else {
          this.loggedIn.emit('you are not yet logged in');
          return of({ success: false, message: 'Invalid username or password' });
        }
      }),
      catchError(this.handleError)
    );
  }

  getCurrentUser(): Observable<any> {
    if (this.currentUser) {
      return of(this.currentUser);
    } else {
      return of(null);
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.getCurrentUser().pipe(
      map(user => !!user)
    );
  }

  logout() {
    this.currentUser = null;
    // Optionally, you can emit a logout event if needed
  }

  private handleError(error: any): Observable<never> {
    console.error('Error:', error);
    throw error;
  }
}
