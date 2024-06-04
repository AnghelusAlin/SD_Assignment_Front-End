import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiBaseUrl = 'http://localhost:8080/questions'; // Base URL for questions

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/getAll`).pipe(
      tap(data => console.log('Questions:', data)),
      catchError(error => {
        console.error('Error fetching questions:', error);
        return throwError(error);
      })
    );
  }

  getQuestionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/getById`, { params: { id: id.toString() } }).pipe(
      tap(data => console.log('Question:', data)),
      catchError(error => {
        console.error('Error fetching question:', error);
        return throwError(error);
      })
    );
  }

  insertQuestion(question: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/insertQuestion`, question).pipe(
      tap(data => console.log('Inserted Question:', data)),
      catchError(error => {
        console.error('Error inserting question:', error);
        return throwError(error);
      })
    );
  }

  updateQuestion(question: any): Observable<any> {
    return this.http.put<any>(`${this.apiBaseUrl}/updateQuestion`, question).pipe(
      tap(data => console.log('Updated Question:', data)),
      catchError(error => {
        console.error('Error updating question:', error);
        return throwError(error);
      })
    );
  }

  deleteQuestion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiBaseUrl}/deleteById`, { params: { id: id.toString() } }).pipe(
      tap(data => console.log('Deleted Question:', data)),
      catchError(error => {
        console.error('Error deleting question:', error);
        return throwError(error);
      })
    );
  }
}
