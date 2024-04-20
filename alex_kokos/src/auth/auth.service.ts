import { Body, ForbiddenException, HttpCode, HttpStatus, Injectable, Req } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, LoginDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService{
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService) {}

    async signup(dto: AuthDto) {
        const hash = await argon.hash(dto.password);
        try{
            if(dto.login === 'admin')
                throw PrismaClientKnownRequestError;
            const user = await this.prisma.students.create({
                data: {
                    fio: dto.login,
                    balance: 0,
                    email: dto.email,
                    user_password: hash
                },
            })
            return this.signToken(user.user_ident, user.fio);
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
        if(dto.login === 'admin' && dto.password === 'admin')
        {
            return this.signToken(0, 'admin');
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
            return this.signToken(user.user_ident, user.fio);
        else if(teacher)
            return this.signToken(teacher.user_ident, teacher.fio);
    }
    
    async signToken(userId: number, login: string): Promise<{access_token: string}>
    {
        const payload = {
            sub: userId,
            fio: login
        }
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, {expiresIn: '15m', secret: secret});


        return {access_token: token}
    }
}