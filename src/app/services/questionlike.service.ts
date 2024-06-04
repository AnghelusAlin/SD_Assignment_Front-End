import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionLikeService {

  private apiBaseUrl = 'http://localhost:8080/questionlikes'; // Base URL for question likes

  constructor(private http: HttpClient) { }

  getQuestionLikes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/getAll`).pipe(
      tap(data => console.log('Question Likes:', data)),
      catchError(error => {
        console.error('Error fetching question likes:', error);
        return throwError(error);
      })
    );
  }

  getLikesOfQuestion(question: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiBaseUrl}/getLikesOfQuestion`, question).pipe(
      tap(data => console.log('Likes of Question:', data)),
      catchError(error => {
        console.error('Error fetching likes of question:', error);
        return throwError(error);
      })
    );
  }

  insertQuestionLike(questionLike: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/insertQuestionLike`, questionLike).pipe(
      tap(data => console.log('Inserted Question Like:', data)),
      catchError(error => {
        console.error('Error inserting question like:', error);
        return throwError(error);
      })
    );
  }

  deleteQuestionLike(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiBaseUrl}/deleteById`, { params: { id: id.toString() } }).pipe(
      tap(data => console.log('Deleted Question Like:', data)),
      catchError(error => {
        console.error('Error deleting question like:', error);
        return throwError(error);
      })
    );
  }
}
