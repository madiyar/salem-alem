import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Book } from './types';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BookService {
    host = environment.apiUrl;

    constructor(private httpClient: HttpClient) {}

    getAll(): Observable<Book[]> {
        return this.httpClient.get<Book[]>(`${this.host}/books`);
    }

    getById(id: number) {
        return this.httpClient.get<Book>(`${this.host}/books/${id}`);
    }

    create(data: Book) {
        return this.httpClient.post<any>(`${this.host}/books`, data);
    }
    
    update(data: Book) {
        return this.httpClient.put<any>(`${this.host}/books/${data.id}`, data);
    }

    delete(id: number) {
        return this.httpClient.delete<Book>(`${this.host}/books/${id}`);
    }

}