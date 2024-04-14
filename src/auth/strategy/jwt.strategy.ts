import { Injectable} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
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
            return user;
        }
        else{
            delete user.user_password
            return user;
        }

    }
}