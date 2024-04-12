import { Body, Injectable, Req } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';

@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService) {}
    async signup(dto: AuthDto) {
        const hash = await argon.hash(dto.password);
        const user = await this.prisma.students.create({
            data: {
                fio: dto.login,
                balance: 0,
                email: dto.email,
                user_password: hash
            },
        })
        return user;
    }
    signin() {
        return 'signin'
    }
    
}