import { Body, Controller, ForbiddenException, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { Students } from '@prisma/client';
import { GetUser } from 'src/auth/decorater';
import { CourseDto } from 'src/auth/dto/course.dto';
import { JwtGuard } from 'src/auth/guard';
import { CourseService } from './courses.service';



@Controller('courses')
export class CoursesController {
    constructor(private courseService: CourseService) {}
    
    @Get('getall')
    GetAll(@Body() body : {name: string, price: number, descipline: number, page: number, limit: number}) {
        console.log(body.price)
        return this.courseService.getall(body.name, body.price, body.descipline,  body.page, body.limit)
    }

    @Get('getone/:id')
    GetOne(@Param('id') id){
        return this.courseService.getOne(id);
    }

    @Get('getallUser')
    @UseGuards(JwtGuard)
    GetAllUser(@Body() body : {name: string, price: number, descipline: number, page: number, limit: number, user:number, role:string}) {
        return this.courseService.getallUser(body.name, body.price, body.descipline,  body.page, body.limit, body.user, body.role)
    }


    @Post('create')
    @UseGuards(JwtGuard)
    Create(@Body() dto : CourseDto, @GetUser() user : {id: number, fio: string, role:string}) {
        if(user.role === 'admin')
        {
            return this.courseService.create(dto);
        }
        else
            throw new ForbiddenException('not enough privilege')
    }
}

