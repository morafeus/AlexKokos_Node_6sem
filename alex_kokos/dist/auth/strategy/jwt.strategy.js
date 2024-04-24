"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var JwtStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const prisma_service_1 = require("../../prisma/prisma.service");
let JwtStrategy = JwtStrategy_1 = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor(config, prisma) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([JwtStrategy_1.fromTokenAsCookies]),
            secretOrKey: config.get('JWT_SECRET'),
        });
        this.prisma = prisma;
    }
    async validate(payload) {
        console.log(payload);
        if (payload.fio == 'admin') {
            const user = { user_ident: 0, fio: 'admin', role: 'admin' };
            return user;
        }
        const user = await this.prisma.students.findFirst({
            where: {
                fio: payload.fio
            }
        });
        if (!user) {
            const user = await this.prisma.teachers.findFirst({
                where: {
                    fio: payload.fio
                }
            });
            delete user.user_password;
            user['role'] = 'teacher';
            return user;
        }
        else {
            delete user.user_password;
            user['role'] = 'student';
            return user;
        }
    }
    static fromTokenAsCookies(req) {
        if (req?.cookies) {
            return req.cookies['auth'];
        }
        else {
            return null;
        }
    }
};
exports.JwtStrategy = JwtStrategy;
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], JwtStrategy, "fromTokenAsCookies", null);
exports.JwtStrategy = JwtStrategy = JwtStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, prisma_service_1.PrismaService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map