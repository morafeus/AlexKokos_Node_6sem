import { Body, Controller, ForbiddenException, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { Students } from '@prisma/client';
import { GetUser } from 'src/auth/decorater';
import { CourseDto } from 'src/auth/dto/course.dto';
import { JwtGuard } from 'src/auth/guard';
import { CourseService } from './courses.service';



@Controller('courses')
export class CoursesController {
    constructor(private courseService: CourseService) {}
    
    @Get('getall')
    GetAll(@Body() body : {name: string, price: number, descipline: number, page: number, limit: number,}) {
        return this.courseService.getall(body.name, body.price, body.descipline,  body.page, body.limit)
    }

    @UseGuards(JwtGuard)
    @Post('create')
    Create(@Body() dto : CourseDto, @GetUser() user : {id: number, fio: string, role:string}) {
        if(user.role === 'admin')
        {
            return this.courseService.create(dto);
        }
        else
            throw new ForbiddenException('not enough privilege')
    }
}

