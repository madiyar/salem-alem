import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// My imports
import { Course } from '../../shared/types/course.types';
import { CourseRestService } from '../../shared/course-rest.service';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {

  public course: Course;

  constructor(
    private courseRestService: CourseRestService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title
    ) { }

  ngOnInit(): void {
    this.getCourse();
  }

  getCourse() {
    this.route.data.subscribe(data => {
      if(data.course) {
        this.course = data.course;
        this.titleService.setTitle(`${data.course.title} | Курстар`);
      }
    });
  }

  

}
