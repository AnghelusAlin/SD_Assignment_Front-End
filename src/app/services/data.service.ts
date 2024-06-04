import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiBaseUrl = 'http://localhost:8080'; // Base URL for the API

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/questions/getAll`).pipe(
      tap(data => console.log('Questions:', data)),
      catchError(error => {
        console.error('Error fetching questions:', error);
        return throwError(error);
      })
    );
  }

  getAnswers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/answers/getAll`).pipe(
      tap(data => console.log('Answers:', data)),
      catchError(error => {
        console.error('Error fetching answers:', error);
        return throwError(error);
      })
    );
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/users/getAll`).pipe(
      tap(data => console.log('Users:', data)),
      catchError(error => {
        console.error('Error fetching users:', error);
        return throwError(error);
      })
    );
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiBaseUrl}/tags/getAll`).pipe(
      tap(data => console.log('Tags:', data)),
      catchError(error => {
        console.error('Error fetching tags:', error);
        return throwError(error);
      })
    );
  }
}
