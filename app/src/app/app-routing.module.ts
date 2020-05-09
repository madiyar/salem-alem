import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogComponent } from './blog/blog.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookComponent } from './book/book.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'blog/new', component: BlogComponent },
      { path: 'blog/:id', component: BlogComponent },
      { path: 'blog', component: BlogListComponent },
      { path: 'book/new', component: BookComponent },
      { path: 'book/:id', component: BookComponent },
      { path: 'book', component: BookListComponent },
      { path: '::', component: PageNotFoundComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}