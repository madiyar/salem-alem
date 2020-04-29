import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { BlogService } from "../services/blog.service";

@Controller('blog')
export class BlogController {

    constructor(
        private readonly service: BlogService
    ) {}

    @Get()
    getAll() {
        return this.service.getAll({order: {postedAt: 'DESC'}});
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