import { Body, Controller,  Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserPresenter } from './user.presenter';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Post()
    async create(@Body() data: CreateUserDto) {
        //Body() --> pega o corpo da requisição (string) e transforma em um objeto javascript
         const user = await this.usersService.createCommonUser(data);
         return new UserPresenter(user);
    }
}
