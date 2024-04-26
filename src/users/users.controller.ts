import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users') //route '/users'
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get() //GET /users or /users?role=value
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.userService.findAll(role);
  }
  @Get('interns') //GET /users/interns
  findAllIntern() {
    return [];
  }
  @Get(':id') //GET /users/:id
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Post()
  create(
    @Body()
    createUserDto: CreateUserDto,
  ) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id') //PATCH /users/:id
  updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    userUpdate: UpdateUserDto,
  ) {
    return this.userService.updateById(id, userUpdate);
  }

  @Delete(':id') //DELETE /users/:id
  deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
