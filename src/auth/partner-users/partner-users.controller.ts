import { Body, Controller, Post } from '@nestjs/common';
import { UserPresenter } from '../users/user.presenter';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('partners/users')
export class PartnerUsersController {

    constructor(private usersService: UsersService) { }

    @Post()
    async create(@Body() data: CreateUserDto) {
        //Body() --> pega o corpo da requisição (string) e transforma em um objeto javascript
         const user = await this.usersService.createPartnerUser(data);
         return new UserPresenter(user);
    }
}