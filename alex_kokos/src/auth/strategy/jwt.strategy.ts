import { Injectable} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { resolve } from "node:path";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        })
    }

    async validate(payload: {sub: number, fio: string}) {
        if(payload.fio == 'admin')
        {
            const user = {user_ident: 0, fio: 'admin', role: 'admin'}
            return user;
        }
        const user = await this.prisma.students.findFirst({
            where: {
                fio: payload.fio
            }
        })

        if(!user)
        {
            const user = await this.prisma.teachers.findFirst({
                where : {
                    fio: payload.fio
                }
            })
            delete user.user_password
            user['role'] = 'teacher';
            return user;
        }
        else{
            delete user.user_password
            user['role'] = 'student';
            return user;
        }

    }
}