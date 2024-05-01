import { Body, ForbiddenException, HttpCode, HttpStatus, Injectable, Req, UseGuards, Res } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { CourseDto } from "src/auth/dto/course.dto";



@Injectable()
export class CourseService{
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService) {}

    async getall(name, price, descipline, page, limit) {
        let courses;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;

        if(price == 0 && descipline == 0 && !name){
            courses = await this.prisma.courses.findMany({skip:offset, take:limit});
        }
        if(price != 0 && descipline == 0 && !name){
            console.log(price);
            if(price == 1)
                courses = await this.prisma.courses.findMany({
                    skip:offset, take:limit,
                    orderBy: 
                        {
                          course_cost: 'desc'
                        },
                })
            if(price == 2)
                courses = await this.prisma.courses.findMany({
                    skip:offset, take:limit,
                    orderBy: 
                        {
                        course_cost: 'asc'
                        },
                })
        }
        if(price == 0 && descipline != 0 && !name)
        {
            courses = await this.prisma.courses.findMany({
                skip:offset, take:limit,
                where: {
                    course_descipline: +descipline - 1
                }
            })
        }

        if(price == 0 && descipline == 0 && name)
        {
            courses =await this.prisma.courses.findMany({
                skip:offset, take:limit,
                where: {
                    course_name: {
                        contains: name
                    }
                }
              });
        }

        if(price != 0 && descipline != 0&& !name){
            console.log(price);
            if(price == 1)
                courses = await this.prisma.courses.findMany({
                    skip:offset, take:limit,
                    orderBy: 
                        {
                          course_cost: 'desc'
                        },
                    where: {
                        course_descipline: +descipline -1
                    }
                })
            if(price == 2)
                courses = await this.prisma.courses.findMany({
                    skip:offset, take:limit,
                    orderBy: 
                        {
                        course_cost: 'asc'
                        },
                    where: {
                        course_descipline: +descipline - 1
                    }
                })
        }
        if(price != 0 && descipline == 0&& name){
            console.log(price);
            if(price == 1)
                courses = await this.prisma.courses.findMany({
                    skip:offset, take:limit,
                    orderBy: 
                        {
                          course_cost: 'desc'
                        },
                    where: {
                        course_name: {
                            contains: name
                        }
                    }
                })
            if(price == 2)
                courses = await this.prisma.courses.findMany({
                    orderBy: 
                        {
                        course_cost: 'asc'
                        },
                    where: {
                        course_name: {
                            contains: name
                        }
                    }
                })
        }
        if(price == 0 && descipline != 0&& name){
            courses = await this.prisma.courses.findMany({
                skip:offset, take:limit,
                orderBy: 
                    {
                        course_cost: 'desc'
                    },
                where: {
                    course_descipline: +descipline - 1,
                    course_name: {
                        contains: name
                    }
                }
            })
      
        }
        if(price != 0 && descipline != 0&& name){
            console.log(price);
            if(price == 1)
                courses = await this.prisma.courses.findMany({
                    skip:offset, take:limit,
                    orderBy: 
                        {
                          course_cost: 'desc'
                        },
                    where: {
                        course_descipline: +descipline -1,
                        course_name: {
                            contains: name
                        }
                    }
                })
            if(price == 2)
                courses = await this.prisma.courses.findMany({
                    skip:offset, take:limit,
                    orderBy: 
                        {
                        course_cost: 'asc'
                        },
                    where: {
                        course_descipline: +descipline - 1,
                        course_name: {
                            contains: name
                        }
                    }
                })
        }
       

        return courses;
    }

    @HttpCode(HttpStatus.OK)
    async create(dto: CourseDto) {
        const descipline = await this.prisma.courses.findFirst({
            where:{
                course_name: dto.name
            }
        })
        if(descipline)
            throw new ForbiddenException("this course is already exist");
       
        let course_new = await this.prisma.courses.create({
            data:{
                course_name: dto.name,
                course_cost: dto.cost,
                course_description: dto.description,
                course_descipline: dto.descipline
            }
        })
        return course_new;
    
    
           
        
    }
    

}