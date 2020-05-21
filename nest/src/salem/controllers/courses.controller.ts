import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { CourseService } from "../services/course.service";
import { SectionService } from "../services/section.service";
import { TestService } from "../services/test.service";

@Controller('courses')
export class CoursesController {

    constructor(
        private readonly courseService: CourseService,
        private readonly sectionService: SectionService,
        private readonly testService: TestService,
    ) {}

    @Get()
    getAll() {
        return this.courseService.getAll();
    }

    @Get(':url')
    getByUrl(@Param('url') url: string) {
        return this.courseService.getOne({where: {url: url}});
    }

    @Get(':id/sections')
    getSections(@Param('id') id: number) {
        return this.sectionService.getAll({where: {courseId: id}});
    }

    @Get(':id/tests')
    getTests(@Param('id') id: number) {
        return this.testService.getAll({where: {courseId: id}});
    }

    @Post()
    createCourse(@Body() course) {
        return this.courseService.create(course);
    }

    @Put(':id')
    updateCourse(@Param('id') id: number, @Body() course) {
        return this.courseService.update(id, course);
    }

    @Delete(':id')
    deleteCourse(@Param('id') id: number) {
        return this.courseService.delete(id);
    }

}