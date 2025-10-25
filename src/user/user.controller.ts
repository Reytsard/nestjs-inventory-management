import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  async findUserById(@Param('id') userId: string) {
    return await this.userService.findUserById(userId);
  }

  @Get('/get')
  async findUserByUsername(@Query('username') username: string) {
    return await this.userService.findUserByUsername(username);
  }
}
