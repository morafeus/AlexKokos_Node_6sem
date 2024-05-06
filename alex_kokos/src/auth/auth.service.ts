import { Body, ForbiddenException, HttpCode, HttpStatus, Injectable, Req, UseGuards, Res } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, LoginDto, TeacherDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { connected } from "process";
import { Response } from "express";


@Injectable()
export class AuthService{
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService) {}

    async signup(dto: AuthDto) {
        const hash = await argon.hash(dto.password);
      
        if(dto.login === 'admin')
            throw new ForbiddenException('This login is already exist');
        
        const teacher = await this.prisma.teachers.findFirst({
            where: {
                fio: dto.login,
            },
        })
        if(teacher)
            throw new ForbiddenException('This login is already exist');
        try{

            const user = await this.prisma.students.create({
                data: {
                    fio: dto.login,
                    balance: 0,
                    email: dto.email,
                    user_password: hash
                },
            })
            await this.prisma.forRefreshToken.create({
                data: {
                    user_ident: user.user_ident,
                    user_role: 'student',
                    refresh_token: null
                },
            })
            delete user.user_password;
            return user;
        }
        catch(error)
        {
            if(error instanceof PrismaClientKnownRequestError)
            {
                if(error.code === 'P2002')
                    throw new ForbiddenException('This login is already exist');
            }
            throw Error();
        }
        
    }

    @HttpCode(HttpStatus.OK)
    async signin(dto: LoginDto) {
        var tokens;
        if(dto.login === 'admin' && dto.password === 'admin')
        {
            tokens = await this.signToken(0, 'admin', 'admin');
            await this.updateRt(0,'admin', tokens.refresh_token);
            console.log(tokens);
            return tokens;
        }

        const user = await this.prisma.students.findFirst({
            where: {
                fio: dto.login,
            },
        })

        const teacher = await this.prisma.teachers.findFirst({
            where: {
                fio: dto.login,
            },
        })

        if(!user && !teacher)
            throw new ForbiddenException('this user is not exist');

           
        let pwMatches;
        if(user)
           pwMatches = await argon.verify(user.user_password, dto.password);
        if(teacher)
            pwMatches = await argon.verify(teacher.user_password, dto.password);

        if(!pwMatches)
            throw new ForbiddenException('invalid password');
        if(user)
        {
            tokens = await this.signToken(user.user_ident, user.fio,"student")
            await this.updateRt(user.user_ident,'student', tokens.refresh_token);
            console.log(tokens);
            return tokens ;
        }
        else if(teacher)
        {
            tokens = await this.signToken(teacher.user_ident, teacher.fio,"teacher")
            await this.updateRt(teacher.user_ident,'teacher', tokens.refresh_token);
            console.log(tokens);
            return tokens;
        }
    }

    @HttpCode(HttpStatus.OK)
    async logout(userId: number, role: string) {
        const data  = await this.prisma.forRefreshToken.updateMany({
            where: {
                indent: userId,
                user_role: role,
                refresh_token: {
                    not: null
                }
            },
            data: {
                refresh_token: null
            }
        })
        return data;
    }

    async createTeacher(dto:TeacherDto)
    {
     
        if(dto.fio === 'admin')
        throw new ForbiddenException('This login is already exist');
        const user = await this.prisma.students.findFirst({
            where: {
                fio: dto.fio
            }
        })
        if(user)
            throw new ForbiddenException('This login is already exist');


        try{
            const hash = await argon.hash(dto.password);
            const teacher = await this.prisma.teachers.create({
                data: {
                    fio: dto.fio,
                    email: dto.email,
                    descipline: +dto.descipline,
                    user_password: hash
                },
            })
            await this.prisma.forRefreshToken.create({
                data: {
                    user_ident: teacher.user_ident,
                    user_role: 'teacher',
                    refresh_token: null
                },
            })
            delete teacher.user_password;
            return teacher;
            
        }
        catch(error)
        {
            if(error instanceof PrismaClientKnownRequestError)
            {
                if(error.code === 'P2002')
                throw new ForbiddenException('This login is already exist');
            }
            throw Error();
        }
    }
    
    async signToken(userId: number, login: string, role: string): Promise<{access_token: string, refresh_token: string}>
    {
        const payload = {
            sub: userId,
            fio: login, 
            role: role
        }
        const [at, rt] = await Promise.all([
            this.jwt.signAsync(payload, {
                expiresIn: '15m',
                secret: this.config.get('JWT_SECRET')
            }),
            this.jwt.signAsync(payload, {
                expiresIn: '1d',
                secret: this.config.get('RWT_SECRET')
            }),

        ])
        

        return {
            access_token: at,
            refresh_token: rt 
        };

    }

    async updateRt(userId: number,role: string, refresh_token: string) {
        await this.prisma.forRefreshToken.updateMany({
            where: {
                user_ident: userId,
                user_role: role
            },
            data: {
                refresh_token: refresh_token
            }
        })
    }

    async refreshTokens(userId: number,role: string, rt: string) {
        const user= await this.prisma.forRefreshToken.findFirst({
            where: {
                user_ident: userId,
                user_role: role
            }
        })

        if(!user || !user.refresh_token)
        {
            throw new ForbiddenException('Refresh token incorrect');
        }

        if(user.refresh_token != rt)
        {
            throw new ForbiddenException('Refresh token incorrect');
        }

        var tokens;
        if(user.user_role === 'teacher')
        {
            const teacher = await this.prisma.teachers.findFirst({
                where: {
                    user_ident: user.user_ident,
                },
            })
            tokens = await this.signToken(teacher.user_ident, teacher.fio,"teacher")
            await this.updateRt(teacher.user_ident,'teacher', tokens.refresh_token);
        }

        if(user.user_role === 'student')
        {
            const student = await this.prisma.students.findFirst({
                where: {
                    user_ident: user.user_ident,
                },
            })
            tokens = await this.signToken(student.user_ident, student.fio,"student")
            await this.updateRt(student.user_ident,'student', tokens.refresh_token);
        }

        if(user.user_role === 'admin')
        {
            tokens = await this.signToken(0, 'admin',"admin")

            await this.updateRt(0,'admin', tokens.refresh_token);
        }
        
        return tokens
    }    

}