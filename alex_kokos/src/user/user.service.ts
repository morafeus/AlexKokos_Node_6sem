import { Body, ForbiddenException, HttpCode, HttpStatus, Injectable, Req, UseGuards, Res } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";




@Injectable()
export class UserService{
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService) {}

    async getallTeachers() {
        const descplines = this.prisma.desciplines.findMany()
        return descplines;
    }


    async getallTeachersDesc(id: number) {
        const teachers = await this.prisma.teachers.findMany({
            select:{
                user_ident: true,
                fio: true,
                descipline: true
            },
            where: {
                descipline: +id -1
            }
        })
        return teachers;
    }

    async getStud(id: number){
        const user = await this.prisma.students.findFirst({
            where:{
                user_ident: id
            }
        })
        delete user.user_password;
        return user;
    }

    async UpdateBalance(summ: number, id: number)
    {
        const user = await this.prisma.students.update({
            where: {
                user_ident: id
            },
            data: {
                balance: {
                    increment: +summ
                } 
            }
        })
        console.log(user);
        return user;
    }

}