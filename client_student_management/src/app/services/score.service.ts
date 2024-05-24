import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Score } from '../type';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private baseURL: string = 'http://localhost:8000/score/';

  constructor(private apiService: ApiService) {}

  getScores(): Observable<Score[]> {
    return this.apiService.get<Score[]>(this.baseURL);
  }
  getScore(id: number): Observable<Score> {
    return this.apiService.get<Score>(`${this.baseURL}${id}`);
  }
  addScore(body: any): Observable<Score[]> {
    return this.apiService.post<Score[]>(this.baseURL, body);
  }
  editScore(body: any, id: number): Observable<Score[]> {
    return this.apiService.put<Score[]>(`${this.baseURL}${id}/`, body);
  }
  deleteScore(id: number): Observable<Score[]> {
    return this.apiService.delete<Score[]>(`${this.baseURL}${id}`);
  }

  getScoreBasedOnAll(
    classId: any,
    semesterId: any,
    studentId: any,
    subjectId: any
  ) {
    // http://localhost:8000/score/1/2/1/3
    return this.apiService.get<Score[]>(
      `${this.baseURL}${classId}/${semesterId}/${studentId}/${subjectId}`
    );
  }
}
