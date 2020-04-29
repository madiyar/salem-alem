import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';

// My imports
import { Course } from '../shared/types/course.types';
import { CourseRestService } from '../shared/course-rest.service'

@Injectable()
export class CourseResolver implements Resolve<Course> {

    constructor(private courseRestService: CourseRestService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Course> {
        return this.courseRestService.getCourse(route.paramMap.get('url'));
    }
}