import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { CommentService } from "../services/comment.service";

@Controller('comments')
export class CommentsController {

    constructor(
        private readonly commentService: CommentService
    ) {}

    @Get()
    getAll() {
        return this.commentService.getAll();
    }

    @Get(':type/:targetId') 
    getComments(@Param('type') type: string, @Param('targetId') id: number) {
        return this.commentService.getAll({where: {type: type, targetId: id}});
    }

    @Get(':id')
    getById(@Param('id') id: number) {
        return this.commentService.getById(id);
    }

    @Post()
    create(@Body() data) {
        return this.commentService.create(data);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() data) {
        return this.commentService.update(id, data);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.commentService.delete(id);
    }

}