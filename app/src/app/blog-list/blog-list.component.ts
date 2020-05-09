import { Component, OnInit } from '@angular/core';
import { BlogService } from '../shared/blog.service';
import { Blog } from '../shared/types';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  constructor(private service: BlogService) { }

  env = environment;
  public data: Blog[] = [];
  public dataToShow: Blog[] = [];
  public searchQuery: string = '';

  ngOnInit(): void {
    this.getData();
    this.dataToShow = [...this.data];
  }

  // GET BOOKS
  getData() {
    this.service.getAll()
    .subscribe(data => {
      this.data = data;
      this.dataToShow = [...this.data];
    });
  }

  // SEARCH BOOK BY NAME
  search() {
    this.dataToShow = this.data.filter(
      book => book.title.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase())
    )
  } 

}
