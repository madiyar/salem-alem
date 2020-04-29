import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// Modules
import { CourseModule } from './salem/course.module';

// Entities
import { Course } from './salem/entities/Course';
import { Section } from './salem/entities/Section';
import { Chapter } from './salem/entities/Chapter';
import { User } from './salem/entities/User';
import { Progress } from './salem/entities/Progress';
import { Book } from './salem/entities/Book';
import { Blog } from './salem/entities/Blog';
import { Comment } from './salem/entities/Comment';
import { QuestionCategory } from './salem/entities/QuestionCategory';
import { Question } from './salem/entities/Question';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      username: 'root',
      password: '',
      database: 'diplom',
      entities: [Course, Section, Chapter, User, Progress, Book, Blog, Comment, QuestionCategory, Question],
      synchronize: false,
    }),
    CourseModule,
    MulterModule.register({
      dest: './uploads'
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads')
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
