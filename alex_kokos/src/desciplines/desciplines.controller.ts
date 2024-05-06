import { Body, Controller, Get, Patch, Post, Request, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { Students } from '@prisma/client';
import { userInfo } from 'os';
import { GetUser } from 'src/auth/decorater';
import { DesciplineDto } from 'src/auth/dto';
import { JwtGuard } from 'src/auth/guard';
import { DesciplineService } from './desciplines.service';


@Controller('desciplines')
export class DesciplinesController {
    constructor(private desciplineService: DesciplineService) {} 
    @Get('getall')
    getAll() {
        return this.desciplineService.getall();
    }

    @UseGuards(JwtGuard)
    @Post('create')
    Create(@Body() dto : DesciplineDto, @GetUser() user : {id: number, fio: string, role:string}) {
        if(user.role === 'admin')
        {
            return this.desciplineService.create(dto);
        }
        else
            throw new ForbiddenException('not enough privilege')
    }

    

}

