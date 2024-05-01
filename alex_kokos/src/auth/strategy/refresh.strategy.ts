import { Injectable, Req} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { resolve } from "node:path";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { Request } from "express";

@Injectable()
export class RtJwtStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh'
) {
    constructor(private config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('RWT_SECRET'),
            passReqToCallback: true,
        }) ;
    }


    async validate(req: Request, payload: {sub: number, fio: string, role: string}) {
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
        }

        if(payload.role == 'student') {
            user = await this.prisma.students.findFirst({
                where: {
                    fio: payload.fio
                }
            })
        } 
        user['role'] == payload.role;

        const refreshToken = req.get('authorization').replace('Bearer', '').trim();

        return {
            ...user,
            refreshToken
        };
    }
}
