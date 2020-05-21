import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { ProgressService } from "../services/progress.service";

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UserService,
        private readonly progressService: ProgressService,
    ) {}

    @Get()
    getAll() {
        return this.userService.getAll();
    }

    @Get(':id')
    getById(@Param('id') id: number) {
        return this.userService.getById(id);
    }

    @Get(':id/progress')
    getProgress(@Param('id') id: number) {
        return this.progressService.getAll({where: {userId: id}});
    }

    @Post('auth')
    userAuth(@Body() data) {
        return this.userService.getOne({where: {email: data.email, password: data.password}});
    }

    @Post()
    create(@Body() data) {
        return this.userService.create(data);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() data) {
        return this.userService.update(id, data);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.userService.delete(id);
    }
}