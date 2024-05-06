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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const dto_1 = require("./dto");
const argon = require("argon2");
const library_1 = require("@prisma/client/runtime/library");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async signup(dto) {
        const hash = await argon.hash(dto.password);
        if (dto.login === 'admin')
            throw new common_1.ForbiddenException('This login is already exist');
        const teacher = await this.prisma.teachers.findFirst({
            where: {
                fio: dto.login,
            },
        });
        if (teacher)
            throw new common_1.ForbiddenException('This login is already exist');
        try {
            const user = await this.prisma.students.create({
                data: {
                    fio: dto.login,
                    balance: 0,
                    email: dto.email,
                    user_password: hash
                },
            });
            await this.prisma.forRefreshToken.create({
                data: {
                    user_ident: user.user_ident,
                    user_role: 'student',
                    refresh_token: null
                },
            });
            delete user.user_password;
            return user;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002')
                    throw new common_1.ForbiddenException('This login is already exist');
            }
            throw Error();
        }
    }
    async signin(dto) {
        var tokens;
        if (dto.login === 'admin' && dto.password === 'admin') {
            tokens = await this.signToken(0, 'admin', 'admin');
            await this.updateRt(0, 'admin', tokens.refresh_token);
            console.log(tokens);
            return tokens;
        }
        const user = await this.prisma.students.findFirst({
            where: {
                fio: dto.login,
            },
        });
        const teacher = await this.prisma.teachers.findFirst({
            where: {
                fio: dto.login,
            },
        });
        if (!user && !teacher)
            throw new common_1.ForbiddenException('this user is not exist');
        let pwMatches;
        if (user)
            pwMatches = await argon.verify(user.user_password, dto.password);
        if (teacher)
            pwMatches = await argon.verify(teacher.user_password, dto.password);
        if (!pwMatches)
            throw new common_1.ForbiddenException('invalid password');
        if (user) {
            tokens = await this.signToken(user.user_ident, user.fio, "student");
            await this.updateRt(user.user_ident, 'student', tokens.refresh_token);
            console.log(tokens);
            return tokens;
        }
        else if (teacher) {
            tokens = await this.signToken(teacher.user_ident, teacher.fio, "teacher");
            await this.updateRt(teacher.user_ident, 'teacher', tokens.refresh_token);
            console.log(tokens);
            return tokens;
        }
    }
    async logout(userId, role) {
        const data = await this.prisma.forRefreshToken.updateMany({
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
        });
        return data;
    }
    async createTeacher(dto) {
        if (dto.fio === 'admin')
            throw new common_1.ForbiddenException('This login is already exist');
        const user = await this.prisma.students.findFirst({
            where: {
                fio: dto.fio
            }
        });
        if (user)
            throw new common_1.ForbiddenException('This login is already exist');
        try {
            const hash = await argon.hash(dto.password);
            const teacher = await this.prisma.teachers.create({
                data: {
                    fio: dto.fio,
                    email: dto.email,
                    descipline: +dto.descipline,
                    user_password: hash
                },
            });
            await this.prisma.forRefreshToken.create({
                data: {
                    user_ident: teacher.user_ident,
                    user_role: 'teacher',
                    refresh_token: null
                },
            });
            delete teacher.user_password;
            return teacher;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002')
                    throw new common_1.ForbiddenException('This login is already exist');
            }
            throw Error();
        }
    }
    async signToken(userId, login, role) {
        const payload = {
            sub: userId,
            fio: login,
            role: role
        };
        const [at, rt] = await Promise.all([
            this.jwt.signAsync(payload, {
                expiresIn: '15m',
                secret: this.config.get('JWT_SECRET')
            }),
            this.jwt.signAsync(payload, {
                expiresIn: '1d',
                secret: this.config.get('RWT_SECRET')
            }),
        ]);
        return {
            access_token: at,
            refresh_token: rt
        };
    }
    async updateRt(userId, role, refresh_token) {
        await this.prisma.forRefreshToken.updateMany({
            where: {
                user_ident: userId,
                user_role: role
            },
            data: {
                refresh_token: refresh_token
            }
        });
    }
    async refreshTokens(userId, role, rt) {
        const user = await this.prisma.forRefreshToken.findFirst({
            where: {
                user_ident: userId,
                user_role: role
            }
        });
        if (!user || !user.refresh_token) {
            throw new common_1.ForbiddenException('Refresh token incorrect');
        }
        if (user.refresh_token != rt) {
            throw new common_1.ForbiddenException('Refresh token incorrect');
        }
        var tokens;
        if (user.user_role === 'teacher') {
            const teacher = await this.prisma.teachers.findFirst({
                where: {
                    user_ident: user.user_ident,
                },
            });
            tokens = await this.signToken(teacher.user_ident, teacher.fio, "teacher");
            await this.updateRt(teacher.user_ident, 'teacher', tokens.refresh_token);
        }
        if (user.user_role === 'student') {
            const student = await this.prisma.students.findFirst({
                where: {
                    user_ident: user.user_ident,
                },
            });
            tokens = await this.signToken(student.user_ident, student.fio, "student");
            await this.updateRt(student.user_ident, 'student', tokens.refresh_token);
        }
        if (user.user_role === 'admin') {
            tokens = await this.signToken(0, 'admin', "admin");
            await this.updateRt(0, 'admin', tokens.refresh_token);
        }
        return tokens;
    }
};
exports.AuthService = AuthService;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "signin", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "logout", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map