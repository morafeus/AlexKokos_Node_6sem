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
    getStudent(@GetUser() user )
    {
        if(user.role === 'student')
        {
            return this.userService.getStud(user.user_ident);
        }
        else
            throw new ForbiddenException('not enough privilege')
    }

    @Post('balance')
    UpdateBalance(@Body() {balance}, @GetUser() user)
    {
        console.log(user);
        if(user.role === 'student')
        {
            return this.userService.UpdateBalance(balance, user.user_ident);
        }
        else
            throw new ForbiddenException('not enough privilege')
    }

    @Post('deleteUser')
    DeleteUser(@Body() {name}, @GetUser() user)
    {
        
        if(user.role === 'admin')
        {
            return this.userService.DeleteUser(name);
        }
        else
            throw new ForbiddenException('not enough privilege')
    }
}



