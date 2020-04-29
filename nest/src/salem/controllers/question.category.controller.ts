import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { QuestionCategoryService } from "../services/question.category.service";
import { QuestionService } from "../services/question.service";

@Controller('categories')
export class QuestionCategoryController {

    constructor(
        private readonly service: QuestionCategoryService,
        private readonly questionService: QuestionService,
    ) {}

    @Get()
    getAll() {
        return this.service.getAll();
    }

    @Get(':id/questions')
    getQuestions(@Param('id') id: number) {
        return this.questionService.getAll({where: {categoryId: id}, order: {id: 'DESC'}});
    }

    @Get(':id')
    getById(@Param('id') id: number) {
        return this.service.getById(id);
    }

    @Post()
    create(@Body() data) {
        return this.service.create(data);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() data) {
        return this.service.update(id, data);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.service.delete(id);
    }

}