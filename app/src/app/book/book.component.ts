import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/book.service';
import { environment } from '../../environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Book } from '../shared/types';
import { Router, ActivatedRoute } from '@angular/router';
import { mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  form: FormGroup;
  book: Book;
  title: string = "Жаңа кітап";
  env = environment;

  loading: boolean;
  isLoading: boolean;

  constructor(
    private service: BookService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      mergeMap(params => {
        if(params.get('id')) {
          this.title = "Кітапты өзгерту";
          return this.service.getById(+params.get('id'));
        }
        return of(null);
      })
    )
    .subscribe(data => {
        this.book = data;
        if (this.book) {
          this.form.patchValue(this.book);
        }  
      }
    );

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      fileUrl: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
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
    if(this.book) {
      this.service.update({...this.book, ...this.form.value})
      .pipe(catchError(() => of(null)))
      .subscribe(res => {
        if (res) {
          this.router.navigate(['/main/book']);
        }
        this.isLoading = false;
      });
      return;
    }

    // Create
    this.service.create(this.form.value)
      .pipe(catchError(() => of(null)))
      .subscribe(res => {
        if (res) {
          this.router.navigate(['/main/book']);
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
