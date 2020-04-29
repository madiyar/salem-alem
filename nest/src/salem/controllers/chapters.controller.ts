import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { ChapterService } from "../services/chapter.service";

@Controller('chapters')
export class ChaptersController {

    constructor(
        private readonly chapterService: ChapterService
    ) {}

    @Get()
    getAll() {
        return this.chapterService.getAll();
    }

    @Get(':id')
    getById(@Param('id') id: number) {
        return this.chapterService.getById(id);
    }

    @Post()
    createChapter(@Body() chapter) {
        return this.chapterService.create(chapter);
    }

    @Put(':id')
    updateChapter(@Param('id') id: number, @Body() chapter) {
        return this.chapterService.update(id, chapter);
    }

    @Delete(':id')
    deleteChapter(@Param('id') id: number) {
        return this.chapterService.delete(id);
    }

}