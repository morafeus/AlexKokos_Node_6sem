import { Body, Controller, ForbiddenException, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { Students } from '@prisma/client';
import { GetUser } from 'src/auth/decorater';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';


@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    @Get('me')
    getMe(@GetUser() user : {id: number, fio: string, role:string}) {
        return user;
    }

    @Get('getTeacherDesc/:desc')
    getTeacherDesc(@Param('desc') desc){
        return this.userService.getallTeachersDesc(desc)
    }

    @Get('getStudent')
    getStudent(@GetUser() user : {id: number, fio: string, role:string})
    {
        console.log(user.id);
        if(user.role === 'student')
        {
            return this.userService.getStud(user.id);
        }
        else
            throw new ForbiddenException('not enough privilege')
    }

    @Post('balance')
    UpdateBalance(@Body() {balance}, @GetUser() user)
    {
        console.log(user.user_ident);
        if(user.role === 'student')
        {
            return this.userService.UpdateBalance(balance, user.user_ident);
        }
        else
            throw new ForbiddenException('not enough privilege')
    }
}



