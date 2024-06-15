import { Body, Get, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRoles } from './user.roles';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {

    }

    createPartnerUser(data: CreateUserDto) {
        //Body() --> pega o corpo da requisição (string) e transforma em um objeto javascript
        return this.prismaService.user.create({
            data: {
                ...data,
                password: this.generateHash(data.password),
                roles: [UserRoles.PARTNER],
            }
        })
    }

    createCommonUser(data: CreateUserDto) {
        //Body() --> pega o corpo da requisição (string) e transforma em um objeto javascript
        return this.prismaService.user.create({
            data: {
                ...data,
                password: this.generateHash(data.password),
                roles: [UserRoles.USER],
            }
        })
    }

    generateHash(password: string) {
        //return this.prismaService.user.generateHash(password)
        return bcrypt.hashSync(password, 10);
    }

    findOne(idOrEmail: number | string) {
        return this.prismaService.user.findFirst({
            where: {
                ...(typeof idOrEmail === 'number') ? { id: idOrEmail } : { email: idOrEmail }
            }
        })
    }
}
