import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Department } from './department.model';
import { Employee } from './employee.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url = "http://localhost:43626/api/Department";
  employeeUrl = "http://localhost:43626/api/Department";
  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.url)
      .pipe(
        catchError(this.handleError));
  }

  getEmployees(depId: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url, {
      params: {
        Id: depId
      }
    })
    .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }

    return throwError('Error occurred :');
  }
}
