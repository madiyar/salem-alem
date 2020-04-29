import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Course } from './types/course.types';

@Injectable({
    providedIn: 'root'
})
export class CourseRestService {
    apiUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) {
        // this.http;
    }

    // ALL STUDS
    getCourses(): Observable<Course[]> {
        return this.http.get<Course[]>(`${this.apiUrl}/courses`);
    }
    // ONE STUD
    getCourse(url: string): Observable<Course> {
        return this.http.get<Course>(`${this.apiUrl}/courses/${url}`);
    }


    // // NEW STUD
    // createStudent(student: Student): Observable<Student> {
    //     return this.http.post<Student>(`${this.apiUrl}/students`, student);
    // }
    // // DEL STUD
    // deleteStudent(id: string): Observable<Student> {
    //     return this.http.delete<Student>(`${this.apiUrl}/students/${id}`);
    // }
    // // PUT STUD
    // updateStudent(student: Student): Observable<Student> {
    //     return this.http.put<Student>(`${this.apiUrl}/students/${student.id}`, student);
    // }
}