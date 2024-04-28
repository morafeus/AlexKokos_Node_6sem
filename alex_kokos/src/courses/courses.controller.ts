import { Controller, Get, Patch, Request, UseGuards } from '@nestjs/common';
import { Students } from '@prisma/client';
import { GetUser } from 'src/auth/decorater';
import { JwtGuard } from 'src/auth/guard';


@UseGuards(JwtGuard)
@Controller('courses')
export class CoursesController {
    
    @Get('main')
    @UseGuards(JwtGuard)
    Main(@GetUser() user : {id: number, fio: string, role:string}) {
        return user;
    }

    @Patch()
    editUser() {

    }
}

