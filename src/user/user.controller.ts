import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() data: any) {
    return await this.userService.Register(data);
  }
  @Post(':id')
  async login(
    @Param('id') id: any,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return await this.userService.login(id, email, password);
  }
  @Get()
  async getAll() {
    return await this.userService.getAll();
  }
  @Get(':id')
  async getSingleUser(@Param('id') userId: any) {
    return await this.userService.getSingleUser(userId);
  }
  @Put(":id")
  async update(@Param('id') userId: any, @Body() info:any){
    const user = await this.userService.updateUser(userId,info);
     
    return user;
  }
  @Delete(":id")
  async deleteUser(@Param('id') userId: any){
      return await this.userService.deleteUser(userId);
  }

}
