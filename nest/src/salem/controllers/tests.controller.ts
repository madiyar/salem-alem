import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { TestService } from "../services/test.service";

@Controller('tests')
export class TestsController {

    constructor(
        private readonly service: TestService
    ) {}

    @Get()
    getAll() {
        return this.service.getAll();
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