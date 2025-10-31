import { Body, Controller, Get, Post } from '@nestjs/common';
import * as createUserDto from './dtos/createUser.dto';

@Controller('user')
export class UserController {

    @Post()
    async createUser(@Body() createUser: createUserDto.CreateUserDto) {
        return createUser
    }
 

}
