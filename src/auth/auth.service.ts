import { Body, ForbiddenException, Injectable, Req } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, LoginDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService) {}
    async signup(dto: AuthDto) {
        const hash = await argon.hash(dto.password);
        try{
            const user = await this.prisma.students.create({
                data: {
                    fio: dto.login,
                    balance: 0,
                    email: dto.email,
                    user_password: hash
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

    async signin(dto: LoginDto) {
        const user = await this.prisma.students.findFirst({
            where: {
                fio: dto.login,
            },
        })

        if(!user)
            throw new ForbiddenException('this user is not exist');
        const pwMatches = await argon.verify(user.user_password, dto.password);

        if(!pwMatches)
            throw new ForbiddenException('invalid password');

        delete user.user_password;
        return user;
    }
    
}