import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService  extends PrismaClient implements OnModuleInit{
    // Garante que a aplicação só inicie se o banco de dados estiver conectado
    async onModuleInit() {
        await this.$connect();
    }
}
