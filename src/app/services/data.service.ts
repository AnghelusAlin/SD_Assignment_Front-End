import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>('./../assets/questions.json').pipe(
      tap(data => console.log('Questions:', data)),
      catchError(error => {
        console.error('Error fetching questions:', error);
        throw error;
      })
    );
  }

  getAnswers(): Observable<any[]> {
    return this.http.get<any[]>('./../assets/answers.json').pipe(
      tap(data => console.log('Answers:', data)),
      catchError(error => {
        console.error('Error fetching answers:', error);
        throw error;
      })
    );
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('./../assets/users.json').pipe(
      tap(data => console.log('Users:', data)),
      catchError(error => {
        console.error('Error fetching users:', error);
        throw error;
      })
    );
  }
}
