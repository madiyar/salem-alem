import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { ProgressService } from "../services/progress.service";

@Controller('progress')
export class ProgressController {

    constructor(
        private readonly progressService: ProgressService
    ) {}

    @Get()
    getAll() {
        return this.progressService.getAll();
    }

    @Get(':id')
    getById(@Param('id') id: number) {
        return this.progressService.getById(id);
    }

    @Post()
    createProgress(@Body() data) {
        return this.progressService.create(data);
    }

    @Put(':id')
    updateProgress(@Param('id') id: number, @Body() data) {
        return this.progressService.update(id, data);
    }

    @Delete(':id')
    deleteProgress(@Param('id') id: number) {
        return this.progressService.delete(id);
    }

}