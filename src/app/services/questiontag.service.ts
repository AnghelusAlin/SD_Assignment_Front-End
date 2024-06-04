import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionTagService {

  private apiBaseUrl = 'http://localhost:8080/questiontags'; // Base URL for question tags

  constructor(private http: HttpClient) { }

  getQuestionTags(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/getAll`).pipe(
      tap(data => console.log('Question Tags:', data)),
      catchError(error => {
        console.error('Error fetching question tags:', error);
        return throwError(error);
      })
    );
  }

  insertQuestionTag(questionTag: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/insertQuestionTag`, questionTag).pipe(
      tap(data => console.log('Inserted Question Tag:', data)),
      catchError(error => {
        console.error('Error inserting question tag:', error);
        return throwError(error);
      })
    );
  }

  updateQuestionTag(questionTag: any): Observable<any> {
    return this.http.put<any>(`${this.apiBaseUrl}/updateQuestionTag`, questionTag).pipe(
      tap(data => console.log('Updated Question Tag:', data)),
      catchError(error => {
        console.error('Error updating question tag:', error);
        return throwError(error);
      })
    );
  }

  deleteQuestionTag(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiBaseUrl}/deleteById`, { params: { id: id.toString() } }).pipe(
      tap(data => console.log('Deleted Question Tag:', data)),
      catchError(error => {
        console.error('Error deleting question tag:', error);
        return throwError(error);
      })
    );
  }
}
