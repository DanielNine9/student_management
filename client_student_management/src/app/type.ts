import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface OptionsFetch {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export interface Student {
  id?: number;
  name: string;
  school_class_name: string;
  id_class?: number
}

export interface Semester {
  id?: number;
  name: string;
  rooms: string[];
  subjects: string[];
}

export interface Class {
  id?: number;
  name: string;
  quantity?: number;
  semesters?: string[];
  semester_ids?: number[]
}

export interface Subject {
  id?: number;
  name: string;
  rooms: string[];
  semesters: string[];
}

export interface Score{
  id: number,
  student: string,
  semester: string,
  room: string,
  subject: string,
  score: number
}
