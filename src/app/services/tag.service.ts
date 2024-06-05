import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private apiBaseUrl = 'http://localhost:8080/tags'; // Base URL for tags

  constructor(private http: HttpClient) { }

  getTags(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/getAll`).pipe(
      tap(data => console.log('Tags:', data)),
      catchError(error => {
        console.error('Error fetching tags:', error);
        return throwError(error);
      })
    );
  }
  getTagsOfQuestion(id: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/getTagsOfQuestion/${id}`).pipe(
      tap(data => console.log('Tags:', data)),
      catchError(error => {
        console.error('Error fetching tags:', error);
        return throwError(error);
      })
    );
  }
  insertTag(tag: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/insertTag`, tag).pipe(
      tap(data => console.log('Inserted Tag:', data)),
      catchError(error => {
        console.error('Error inserting tag:', error);
        return throwError(error);
      })
    );
  }

  updateTag(tag: any): Observable<any> {
    return this.http.put<any>(`${this.apiBaseUrl}/updateTag`, tag).pipe(
      tap(data => console.log('Updated Tag:', data)),
      catchError(error => {
        console.error('Error updating tag:', error);
        return throwError(error);
      })
    );
  }

  deleteTag(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiBaseUrl}/deleteById`, { params: { id: id.toString() } }).pipe(
      tap(data => console.log('Deleted Tag:', data)),
      catchError(error => {
        console.error('Error deleting tag:', error);
        return throwError(error);
      })
    );
  }
}
