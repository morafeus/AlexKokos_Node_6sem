import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    url: 'sqlserver://LEXA:1433;database=AlexKokosDB;user=main_admin;password=1234;encrypt=true;trustServerCertificate=true;' 
                }
            }
        })
    }
}
