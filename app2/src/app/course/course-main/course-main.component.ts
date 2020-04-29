import { Component, OnInit } from '@angular/core';

// My imports
import { Course } from '../../shared/types/course.types';
import { CourseRestService } from '../../shared/course-rest.service';

@Component({
  selector: 'app-course-main',
  templateUrl: './course-main.component.html',
  styleUrls: ['./course-main.component.scss']
})
export class CourseMainComponent implements OnInit {

  public allCourses: Course[] = [];

  constructor(private courseRestService: CourseRestService) { }


  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    this.courseRestService.getCourses()
    .subscribe(res => {
      this.allCourses = res;
    });
  }

}
