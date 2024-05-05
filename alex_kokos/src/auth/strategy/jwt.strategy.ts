import { Injectable, Req} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { resolve } from "node:path";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { Request } from "express";

//ExtractJwt.fromExtractors([JwtStrategy.fromTokenAsCookies])

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        })
    }

    async validate(payload: {sub: number, fio: string, role: string}) {
        var user;
        if(payload.fio == 'admin')
        {
            user = {user_ident: 0, fio: 'admin', role: 'admin'}
        }
        if (payload.role == 'teacher') {
            user = await this.prisma.teachers.findFirst({
                where: {
                    fio: payload.fio
                }
            })
            user['role'] = payload.role;
        }

        if(payload.role == 'student') {
            user = await this.prisma.students.findFirst({
                where: {
                    fio: payload.fio
                }
            })
            user['role'] = payload.role;
        } 
        return user;

        

    }

    static fromTokenAsCookies(@Req() req: Request){
        if(req?.cookies){
            return req.cookies['auth'];
        }
        else{
            return null
        }
    }
}