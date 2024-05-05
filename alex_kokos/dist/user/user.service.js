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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let UserService = class UserService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async getallTeachers() {
        const descplines = this.prisma.desciplines.findMany();
        return descplines;
    }
    async getallTeachersDesc(id) {
        const teachers = await this.prisma.teachers.findMany({
            select: {
                user_ident: true,
                fio: true,
                descipline: true
            },
            where: {
                descipline: +id - 1
            }
        });
        return teachers;
    }
    async getStud(id) {
        const user = await this.prisma.students.findFirst({
            where: {
                user_ident: id
            }
        });
        delete user.user_password;
        return user;
    }
    async UpdateBalance(summ, id) {
        const user = await this.prisma.students.update({
            where: {
                user_ident: id
            },
            data: {
                balance: {
                    increment: +summ
                }
            }
        });
        console.log(user);
        return user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], UserService);
//# sourceMappingURL=user.service.js.map