import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Class } from '../type';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  private baseURL: string = 'http://localhost:8000/school-class/';

  constructor(private apiService: ApiService) {}

  getClasses(
    url: string = this.baseURL,
    searchParams: string = ''
  ): Observable<any> {
    return this.apiService.get<any>(url + searchParams);
  }
  getClass(id: number): Observable<Class> {
    return this.apiService.get<Class>(`${this.baseURL}${id}`);
  }
  addClass(body: Class): Observable<Class[]> {
    return this.apiService.post<Class[]>(this.baseURL, body);
  }
  editClass(body: Class, id: number): Observable<Class[]> {
    return this.apiService.put<Class[]>(`${this.baseURL}${id}/`, body);
  }
  deleteClass(id: number): Observable<Class[]> {
    return this.apiService.delete<Class[]>(`${this.baseURL}${id}`);
  }

  getAllClasses(): Observable<Class[]> {
    return this.apiService.get<any>(`${this.baseURL}all/`);
  }
}
