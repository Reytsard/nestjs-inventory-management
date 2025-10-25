import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { NewUserDTO } from './newUser.dto';

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

  @Post('/create')
  async createNewUser(@Body() newUserDTO: NewUserDTO) {
    return await this.userService.addNewUser(newUserDTO);
  }
}
