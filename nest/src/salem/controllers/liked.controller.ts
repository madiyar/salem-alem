import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { LikedService } from "../services/liked.service";

@Controller('liked')
export class LikedController {

    constructor(
        private readonly service: LikedService
    ) {}

    @Get()
    getAll() {
        return this.service.getAll();
    }

    @Get('/comment/:id')
    getbyComment(@Param('id') id: number) {
        return this.service.getAll({where: {commentId: id}});
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