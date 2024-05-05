import { Body, Controller, ForbiddenException, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { Students } from '@prisma/client';
import { GetUser } from 'src/auth/decorater';
import { CourseDto } from 'src/auth/dto/course.dto';
import { JwtGuard } from 'src/auth/guard';
import { CourseService } from './courses.service';



@Controller('courses')
export class CoursesController {
    constructor(private courseService: CourseService) {}
    
    @Post('getall')
    GetAll(@Body() body : {name: string, price: number, descipline: number, page: number, limit: number}) {
        console.log(body.price)
        return this.courseService.getall(body.name, body.price, body.descipline,  body.page, body.limit)
    }

    @Get('getone/:id')
    GetOne(@Param('id') id){
        return this.courseService.getOne(id);
    }

    @Get('getoneMy/:id')
    @UseGuards(JwtGuard)
    GetOneMy(@Param('id') id){
        return this.courseService.getOneMy(id);
    }

    @Post('getallUser')
    @UseGuards(JwtGuard)
    GetAllUser(@Body() body : {name: string, price: number, descipline: number, page: number, limit: number}, @GetUser() user) {
        console.log(user);
        if(user.role === 'student' || user.role === 'teacher')
        {
            return this.courseService.getallUser(body.name, body.price, body.descipline,  body.page, body.limit, user.user_ident, user.role)
        }
        else
            throw new ForbiddenException('not enough privilege')
    }


    @Post('create')
    @UseGuards(JwtGuard)
    Create(@Body() dto :CourseDto , @GetUser() user : {id: number, fio: string, role:string}) {
        if(user.role === 'admin')
        {
            return this.courseService.create(dto);
        }
        else
            throw new ForbiddenException('not enough privilege')
    }

    @Post('deleteCourse')
    @UseGuards(JwtGuard)
    Delete(@Body() {id} , @GetUser() user ) {
        if(user.role === 'admin')
        {
            return this.courseService.delete(id);
        }
        else
            throw new ForbiddenException('not enough privilege')
    }

    @Post('buy')
    @UseGuards(JwtGuard)
    BuyCourse(@Body() {id}, @GetUser() user) {
        if(user.role === 'student')
        {
            return this.courseService.buyCourse(id, user.user_ident);
        }
        else
            throw new ForbiddenException('not enough privilege')
    }

    @Post('checkIsMy')
    @UseGuards(JwtGuard)
    CheckIsMy(@Body() {id}, @GetUser() user) {
        if(user.role === 'student')
        {
            return this.courseService.checkIsMy(id, user.user_ident);
        }
        else
            throw new ForbiddenException('not enough privilege')
    }


    @Post('addMaterial')
    @UseGuards(JwtGuard)
    AddMaterial(@Body() {id, name, description}, @GetUser() user) {
        if(user.role === 'teacher')
        {
            return this.courseService.AddMaterial(id, name, description);
        }
        else
            throw new ForbiddenException('not enough privilege')
    }


    @Post('getMaterial')
    @UseGuards(JwtGuard)
    GetMaterial(@Body() {id}) {
        return this.courseService.GetMaterial(id);
    }

    @Post('delMaterial')
    @UseGuards(JwtGuard)
    DelMaterial(@Body() {id}) {
        return this.courseService.DelMaterial(id);
    }

    
    @Post('getStudsByTest')
    @UseGuards(JwtGuard)
    GetStudsByTest(@Body() {id}, @GetUser() user) {
 
        if(user.role === 'teacher')
        {
            return this.courseService.GetStudsByTest(id);
        }
        else
            throw new ForbiddenException('not enough privilege')
    }

    @Post('addTest')
    @UseGuards(JwtGuard)
    AddTest(@Body() {test, id}, @GetUser() user) {
        if(user.role === 'teacher')
        {
            return this.courseService.AddTest(test, id);
        }
        else
            throw new ForbiddenException('not enough privilege')
    }

    @Post('getTest')
    @UseGuards(JwtGuard)
    GetTest(@Body() {id}, @GetUser() user) {
        if(user.role === 'student')
        {
            return this.courseService.GetTest(id);
        }
        else
            throw new ForbiddenException('not enough privilege')
    }

    @Post('delTest')
    @UseGuards(JwtGuard)
    DelTest(@Body() {id}, @GetUser() user) {
        if(user.role === 'teacher')
        {
            return this.courseService.DelTest(id);
        }
        else
            throw new ForbiddenException('not enough privilege')
    }

    @Post('saveSuccess')
    @UseGuards(JwtGuard)
    SaveSuccess(@Body() {id}, @GetUser() user) {
        if(user.role === 'student')
        {
            return this.courseService.SaveSuccess(id, user.user_ident);
        }
        else
            throw new ForbiddenException('not enough privilege')
    }
}

