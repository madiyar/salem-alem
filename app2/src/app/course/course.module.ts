import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

// My imports
import { CourseMainComponent } from './course-main/course-main.component';
import { CoursePageComponent } from './course-page/course-page.component';

import { CourseResolver } from './course.resolver';

const routes: Route[] = [
  { path: '', component: CourseMainComponent },
  { 
    path: ':url', 
    component: CoursePageComponent, 
    resolve: {
      course: CourseResolver
    }
  },
  { path: 'last', component: CourseMainComponent },
];

@NgModule({
  declarations: [
    CourseMainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    CourseResolver
  ]
})
export class CourseModule { }
