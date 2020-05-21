import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Entities
import { Course } from "./entities/Course";
import { Section } from "./entities/Section";
import { Chapter } from "./entities/Chapter";
import { User } from "./entities/User";
import { Progress } from "./entities/Progress";
import { Book } from "./entities/Book";
import { Blog } from "./entities/Blog";
import { Comment } from "./entities/Comment";
import { QuestionCategory } from "./entities/QuestionCategory";
import { Question } from "./entities/Question";
import { Test } from "./entities/Test";
import { Liked } from "./entities/Liked";

// Controllers
import { CoursesController } from "./controllers/courses.controller";
import { SectionsController } from "./controllers/sections.controller";
import { ChaptersController } from "./controllers/chapters.controller";
import { UsersController } from "./controllers/users.controller";
import { ProgressController } from "./controllers/progress.controller";
import { BoooksController } from "./controllers/books.controller";
import { BlogController } from "./controllers/blog.controller";
import { UploaderController } from "./controllers/uploader.controller";
import { CommentsController } from "./controllers/comments.controller";
import { QuestionCategoryController } from "./controllers/question.category.controller";
import { QuestionsController } from "./controllers/questions.controller";
import { TestsController } from "./controllers/tests.controller";
import { LikedController } from "./controllers/liked.controller";

// Services
import { CourseService } from "./services/course.service";
import { SectionService } from "./services/section.service";
import { ChapterService } from "./services/chapter.service";
import { UserService } from "./services/user.service";
import { ProgressService } from "./services/progress.service";
import { BookService } from "./services/book.service";
import { BlogService } from "./services/blog.service";
import { CommentService } from "./services/comment.service";
import { QuestionCategoryService } from "./services/question.category.service";
import { QuestionService } from "./services/question.service";
import { TestService } from "./services/test.service";
import { LikedService } from "./services/liked.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Course, Section, Chapter, 
            User, Progress, Book, Blog, 
            Comment, QuestionCategory, 
            Question, Test, Liked
        ])
    ],
    exports: [TypeOrmModule],
    controllers: [
        CoursesController,
        SectionsController,
        ChaptersController,
        UsersController,
        ProgressController,
        BoooksController,
        BlogController,
        UploaderController,
        CommentsController,
        QuestionCategoryController,
        QuestionsController, 
        TestsController,
        LikedController
    ],
    providers: [
        CourseService,
        SectionService,
        ChapterService,
        UserService,
        ProgressService,
        BookService,
        BlogService,
        CommentService,
        QuestionCategoryService,
        QuestionService,
        TestService,
        LikedService
    ]
})
export class CourseModule {}