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
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002')
                    throw new common_1.ForbiddenException('This login is already exist');
            }
            throw Error();
        }
    }
    async signin(dto, res) {
        if (dto.login === 'admin' && dto.password === 'admin') {
            return this.signToken(0, 'admin', res);
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
        if (user)
            return this.signToken(user.user_ident, user.fio, res);
        else if (teacher)
            return this.signToken(teacher.user_ident, teacher.fio, res);
    }
    async createTeacher(dto) {
        if (dto.login === 'admin')
            throw new common_1.ForbiddenException('This login is already exist');
        const user = await this.prisma.students.findFirst({
            where: {
                fio: dto.login
            }
        });
        if (user)
            throw new common_1.ForbiddenException('This login is already exist');
        try {
            const hash = await argon.hash(dto.password);
            const teacher = await this.prisma.teachers.create({
                data: {
                    fio: dto.login,
                    email: dto.email,
                    descipline: dto.descipline,
                    user_password: hash
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
    async signToken(userId, login, res) {
        const payload = {
            sub: userId,
            fio: login
        };
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, { expiresIn: '15m', secret: secret });
        res.cookie('auth', token);
        return { access_token: token };
    }
};
exports.AuthService = AuthService;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "signin", null);
__decorate([
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "signToken", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map