import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Subject } from '../type';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private baseURL: string = 'http://localhost:8000/subject/';

  constructor(private apiService: ApiService) {}

  getSubjects(url: string = this.baseURL, ordering: string = "+id", search: string = ""): Observable<any> {
    const searchParams = this.baseURL == url ? `?ordering=${ordering}&search=${search}`  : `&ordering=${ordering}&search=${search}`

    return this.apiService.get<any>(url + searchParams);
  }

  getSubject(id: number): Observable<Subject> {
    return this.apiService.get<Subject>(`${this.baseURL}${id}`);
  }
  addSubject(body: any): Observable<Subject[]> {
    return this.apiService.post<Subject[]>(this.baseURL, body);
  }
  editSubject(body: any, id: number): Observable<Subject[]> {
    return this.apiService.put<Subject[]>(`${this.baseURL}${id}/`, body);
  }
  deleteSubject(id: number): Observable<Subject[]> {
    return this.apiService.delete<Subject[]>(`${this.baseURL}${id}`);
  }

  getSubjectBasedOnIdClassAndIdSemester(idClass: number, idSemester: number) {
    return this.apiService.get<Subject[]>(
      `${this.baseURL}filter-by-class-and-semester/?class_id=${idClass}&semester_id=${idSemester}`
    );
  }
}
