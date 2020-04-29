import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { QuestionService } from "../services/question.service";

@Controller('questions')
export class QuestionsController {

    constructor(
        private readonly service: QuestionService
    ) {}

    @Get()
    getAll() {
        return this.service.getAll({order: {id: 'DESC'}});
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