import { Body, ForbiddenException, HttpCode, HttpStatus, Injectable, Req, UseGuards, Res } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { DesciplineDto } from "src/auth/dto";
import { CoursesController } from "src/courses/courses.controller";


@Injectable()
export class DesciplineService{
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService) {}

    async getall() {
        const descplines = this.prisma.desciplines.findMany()
        return descplines;
    }

    @HttpCode(HttpStatus.OK)
    async create(dto: DesciplineDto) {
        const descipline = await this.prisma.desciplines.findFirst({
            where:{
                descipline_name: dto.descipline_name
            }
        })
        if(descipline)
            throw new ForbiddenException("this desciplint is already exist");
       
        let descipline_new = await this.prisma.desciplines.create({
            data:{
                descipline_name: dto.descipline_name
            }
        })
        return descipline_new;  
    }

   
    

}