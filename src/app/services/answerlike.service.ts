import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnswerLikeService {

  private apiBaseUrl = 'http://localhost:8080/answerlikes'; // Base URL for answer likes

  constructor(private http: HttpClient) { }

  getAnswerLikes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/getAll`).pipe(
      tap(data => console.log('Answer Likes:', data)),
      catchError(error => {
        console.error('Error fetching answer likes:', error);
        return throwError(error);
      })
    );
  }

  getLikesOfAnswer(answer: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiBaseUrl}/getLikesOfAnswer`, answer).pipe(
      tap(data => console.log('Likes of Answer:', data)),
      catchError(error => {
        console.error('Error fetching likes of answer:', error);
        return throwError(error);
      })
    );
  }

  insertAnswerLike(answerLike: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/insertAnswerLike`, answerLike).pipe(
      tap(data => console.log('Inserted Answer Like:', data)),
      catchError(error => {
        console.error('Error inserting answer like:', error);
        return throwError(error);
      })
    );
  }

  deleteAnswerLike(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiBaseUrl}/deleteById`, { params: { id: id.toString() } }).pipe(
      tap(data => console.log('Deleted Answer Like:', data)),
      catchError(error => {
        console.error('Error deleting answer like:', error);
        return throwError(error);
      })
    );
  }
}
