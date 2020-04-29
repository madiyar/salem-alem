import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { SectionService } from "../services/section.service";
import { ChapterService } from "../services/chapter.service";

@Controller('sections')
export class SectionsController {

    constructor(
        private readonly sectionService: SectionService,
        private readonly chapterService: ChapterService
    ) {}

    @Get()
    getAll() {
        return this.sectionService.getAll();
    }

    @Get(':id')
    getById(@Param('id') id: number) {
        return this.sectionService.getById(id);
    }

    @Get(':id/chapters')
    getChapters(@Param('id') id: number) {
        return this.chapterService.getAll({where: {sectionId: id}});
    }

    @Post()
    createSection(@Body() section) {
        return this.sectionService.create(section);
    }

    @Put(':id')
    updateSection(@Param('id') id: number, @Body() section) {
        return this.sectionService.update(id, section);
    }

    @Delete(':id')
    deleteSection(@Param('id') id: number) {
        return this.sectionService.delete(id);
    }

}