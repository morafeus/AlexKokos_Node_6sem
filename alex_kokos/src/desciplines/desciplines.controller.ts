import { Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { Students } from '@prisma/client';
import { GetUser } from 'src/auth/decorater';
import { JwtGuard } from 'src/auth/guard';


@UseGuards(JwtGuard)
@Controller('desciplines')
export class DesciplinesController {
    
    @Get('main')
    @UseGuards(JwtGuard)
    Main() {
        return {};
    }

    @Post('create')
    @UseGuards(JwtGuard)
    createDescipline(@GetUser() user : {id: number, fio: string, role:string}) {

    }
}

