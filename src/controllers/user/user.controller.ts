import { Body, Controller, Delete, Get, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AddUserDto, UpdateUserDto } from './user.dto';
import { UserUseCase } from '../../usecases/user/user.usecase';

@Controller('user')
@ApiTags('user')
@ApiResponse({ status: 500, description: 'Internal error' })
export class UserController {
    constructor(
        private userUseCase: UserUseCase,
    ) {}

    @Get("all")
    async getAllUser() {
        return this.userUseCase.getAllUser();
    }

    @Get()
    async getOneUser(@Query('id', ParseIntPipe) id: number) {
        return await this.userUseCase.getOneUser(id);
    }

    @Post()
    async addUser(@Body() dto: AddUserDto) {
        return await this.userUseCase.insert(dto);
    }

    @Put()
    async updateUser(@Query('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
        return await this.userUseCase.update(id, dto);
    }

    @Delete()
    async deleteUser(@Query('id', ParseIntPipe) id: number) {
        return await this.userUseCase.delete(id);
    }
}
