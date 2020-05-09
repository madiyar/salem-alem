import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Blog } from '../shared/types';
import { BlogService } from '../shared/blog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { UploadFile } from 'ng-zorro-antd';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  form: FormGroup;
  blog: Blog;
  title: string = "Жаңа мақала";
  loading: boolean;
  isLoading: boolean;
  env = environment;
  now = new Date();
  currentDate = '';

  constructor(
    private service: BlogService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      mergeMap(params => {
        if(params.get('id')) {
          this.title = "Мақаланы өзгерту";
          return this.service.getById(+params.get('id'));
        }
        return of(null);
      })
    )
    .subscribe(blog => {
        this.blog = blog;
        if (this.blog) {
          this.form.patchValue(this.blog);
        }  
      }
    );

    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
      poster: new FormControl(''),
    });
  }

  onSubmit() {
    for (const i in this.form.controls) {
      if (this.form.controls[i]) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }

    if(!this.form.valid) {
      return;
    }

    // Update
    this.isLoading = true;
    if(this.blog) {
      this.service.update({...this.blog, ...this.form.value})
      .pipe(catchError(() => of(null)))
      .subscribe(res => {
        if (res) {
          this.router.navigate(['/main/blog']);
        }
        this.isLoading = false;
      });
      return;
    }

    // Create
    this.currentDate = `${this.now.getFullYear()}-${(this.now.getMonth()>9) ? this.now.getMonth() : "0"+this.now.getMonth()}-${(this.now.getDate()>9) ? this.now.getDate() : "0"+this.now.getDate()}`;

    this.service.create({...this.form.value, postedAt: this.currentDate})
      .pipe(catchError(() => of(null)))
      .subscribe(res => {
        if (res) {
          this.router.navigate(['/main/blog']);
          this.isLoading = false;
        }
      });
  }

  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading': this.loading = true; break;
      case 'done':
        // Get this url from response in real world.
        console.log(info.file);
        this.form.get('poster').setValue(info.file.response.filename);
        this.loading = false;
      break;
      case 'error': this.loading = false; break;
    }
  }

}
