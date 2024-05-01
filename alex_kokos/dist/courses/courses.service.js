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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const course_dto_1 = require("../auth/dto/course.dto");
let CourseService = class CourseService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async getall(name, price, descipline, page, limit) {
        let courses;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        if (price == 0 && descipline == 0 && !name) {
            courses = await this.prisma.courses.findMany({ skip: offset, take: limit });
        }
        if (price != 0 && descipline == 0 && !name) {
            console.log(price);
            if (price == 1)
                courses = await this.prisma.courses.findMany({
                    skip: offset, take: limit,
                    orderBy: {
                        course_cost: 'desc'
                    },
                });
            if (price == 2)
                courses = await this.prisma.courses.findMany({
                    skip: offset, take: limit,
                    orderBy: {
                        course_cost: 'asc'
                    },
                });
        }
        if (price == 0 && descipline != 0 && !name) {
            courses = await this.prisma.courses.findMany({
                skip: offset, take: limit,
                where: {
                    course_descipline: +descipline - 1
                }
            });
        }
        if (price == 0 && descipline == 0 && name) {
            courses = await this.prisma.courses.findMany({
                skip: offset, take: limit,
                where: {
                    course_name: {
                        contains: name
                    }
                }
            });
        }
        if (price != 0 && descipline != 0 && !name) {
            console.log(price);
            if (price == 1)
                courses = await this.prisma.courses.findMany({
                    skip: offset, take: limit,
                    orderBy: {
                        course_cost: 'desc'
                    },
                    where: {
                        course_descipline: +descipline - 1
                    }
                });
            if (price == 2)
                courses = await this.prisma.courses.findMany({
                    skip: offset, take: limit,
                    orderBy: {
                        course_cost: 'asc'
                    },
                    where: {
                        course_descipline: +descipline - 1
                    }
                });
        }
        if (price != 0 && descipline == 0 && name) {
            console.log(price);
            if (price == 1)
                courses = await this.prisma.courses.findMany({
                    skip: offset, take: limit,
                    orderBy: {
                        course_cost: 'desc'
                    },
                    where: {
                        course_name: {
                            contains: name
                        }
                    }
                });
            if (price == 2)
                courses = await this.prisma.courses.findMany({
                    orderBy: {
                        course_cost: 'asc'
                    },
                    where: {
                        course_name: {
                            contains: name
                        }
                    }
                });
        }
        if (price == 0 && descipline != 0 && name) {
            courses = await this.prisma.courses.findMany({
                skip: offset, take: limit,
                orderBy: {
                    course_cost: 'desc'
                },
                where: {
                    course_descipline: +descipline - 1,
                    course_name: {
                        contains: name
                    }
                }
            });
        }
        if (price != 0 && descipline != 0 && name) {
            console.log(price);
            if (price == 1)
                courses = await this.prisma.courses.findMany({
                    skip: offset, take: limit,
                    orderBy: {
                        course_cost: 'desc'
                    },
                    where: {
                        course_descipline: +descipline - 1,
                        course_name: {
                            contains: name
                        }
                    }
                });
            if (price == 2)
                courses = await this.prisma.courses.findMany({
                    skip: offset, take: limit,
                    orderBy: {
                        course_cost: 'asc'
                    },
                    where: {
                        course_descipline: +descipline - 1,
                        course_name: {
                            contains: name
                        }
                    }
                });
        }
        return courses;
    }
    async create(dto) {
        const descipline = await this.prisma.courses.findFirst({
            where: {
                course_name: dto.name
            }
        });
        if (descipline)
            throw new common_1.ForbiddenException("this course is already exist");
        let course_new = await this.prisma.courses.create({
            data: {
                course_name: dto.name,
                course_cost: dto.cost,
                course_description: dto.description,
                course_descipline: dto.descipline
            }
        });
        return course_new;
    }
};
exports.CourseService = CourseService;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_dto_1.CourseDto]),
    __metadata("design:returntype", Promise)
], CourseService.prototype, "create", null);
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], CourseService);
//# sourceMappingURL=courses.service.js.map