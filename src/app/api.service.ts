import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Mascota } from '../domain/mascota';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3000/api/v1/mascotas';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
/*
  getMascotas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(apiUrl)
      .pipe(
        tap(Mascota => console.log('fetched Mascotas')),
        catchError(this.handleError('getMascotas', []))
      );
  }

  getMascota(id: any): Observable<Mascota> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Mascota>(url).pipe(
      tap(_ => console.log(`fetched Mascota id=${id}`)),
      catchError(this.handleError<Mascota>(`getMascota id=${id}`))
    );
  }

  addMascota(Mascota: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>(apiUrl, Mascota, httpOptions).pipe(
      tap((mascota: Mascota) => console.log(`added Mascota w/ id=${mascota.id}`)),
      catchError(this.handleError<Mascota>('addMascota'))
    );
  }

  updateMascota(id: any, Mascota: any): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, Mascota, httpOptions).pipe(
      tap(_ => console.log(`updated Mascota id=${id}`)),
      catchError(this.handleError<any>('updateMascota'))
    );
  }

  deleteMascota(id: any): Observable<Mascota> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<Mascota>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Mascota id=${id}`)),
      catchError(this.handleError<Mascota>('deleteMascota'))
    );
  }
  */
}
