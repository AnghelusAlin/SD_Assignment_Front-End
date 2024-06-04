import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import {AnswerModel} from "../entities/answer.model";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private apiBaseUrl = 'http://localhost:8080/answers'; // Base URL for answers

  constructor(private http: HttpClient) { }

  getAnswers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/getAll`).pipe(
      tap(data => console.log('Answers:', data)),
      catchError(error => {
        console.error('Error fetching answers:', error);
        return throwError(error);
      })
    );
  }

  getAnswersOfQuestion(questionId: number): Observable<AnswerModel[]> {
    return this.http.get<AnswerModel[]>(`${this.apiBaseUrl}/getAnswersOfQuestion?questionId=${questionId}`).pipe(
      tap(data => console.log('Answers:', data)),
      catchError(error => {
        console.error('Error fetching answers:', error);
        return throwError(error);
      })
    );
  }

  insertAnswer(answer: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/insertAnswer`, answer).pipe(
      tap(data => console.log('Inserted Answer:', data)),
      catchError(error => {
        console.error('Error inserting answer:', error);
        return throwError(error);
      })
    );
  }

  updateAnswer(answer: any): Observable<any> {
    return this.http.put<any>(`${this.apiBaseUrl}/updateAnswer`, answer).pipe(
      tap(data => console.log('Updated Answer:', data)),
      catchError(error => {
        console.error('Error updating answer:', error);
        return throwError(error);
      })
    );
  }

  deleteAnswer(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiBaseUrl}/deleteById`, { params: { id: id.toString() } }).pipe(
      tap(data => console.log('Deleted Answer:', data)),
      catchError(error => {
        console.error('Error deleting answer:', error);
        return throwError(error);
      })
    );
  }
}
