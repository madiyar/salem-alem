import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Blog } from './types';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    host = environment.apiUrl;

    constructor(private httpClient: HttpClient) {}

    getAll(): Observable<Blog[]> {
        return this.httpClient.get<Blog[]>(`${this.host}/blog`);
    }

    getById(id: number) {
        return this.httpClient.get<Blog>(`${this.host}/blog/${id}`);
    }

    create(data: Blog) {
        return this.httpClient.post<any>(`${this.host}/blog`, data);
    }
    
    update(data: Blog) {
        return this.httpClient.put<any>(`${this.host}/blog/${data.id}`, data);
    }

    delete(id: number) {
        return this.httpClient.delete<Blog>(`${this.host}/blog/${id}`);
    }

}