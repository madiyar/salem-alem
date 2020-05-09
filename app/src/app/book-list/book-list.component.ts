import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/book.service';
import { Book } from '../shared/types';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  constructor(private service: BookService) { }

  env = environment;
  public books: Book[] = [];
  public booksToShow: Book[] = [];
  public searchQuery: string = '';

  ngOnInit(): void {
    this.getBooks();
    this.booksToShow = [...this.books];
  }

  // GET BOOKS
  getBooks() {
    this.service.getAll()
    .subscribe(data => {
      this.books = data;
      this.booksToShow = [...this.books];
    });
  }

  // SEARCH BOOK BY NAME
  search() {
    this.booksToShow = this.books.filter(
      book => book.name.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase())
    )
  } 

}
