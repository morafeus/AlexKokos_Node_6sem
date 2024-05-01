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
exports.DesciplineService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const dto_1 = require("../auth/dto");
let DesciplineService = class DesciplineService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async getall() {
        const descplines = this.prisma.desciplines.findMany();
        return descplines;
    }
    async create(dto) {
        console.log(dto.descipline_name);
        const descipline = await this.prisma.desciplines.findFirst({
            where: {
                descipline_name: dto.descipline_name
            }
        });
        if (descipline)
            throw new common_1.ForbiddenException("this desciplint is already exist");
        let descipline_new = await this.prisma.desciplines.create({
            data: {
                descipline_name: dto.descipline_name
            }
        });
        return descipline_new;
    }
};
exports.DesciplineService = DesciplineService;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.DesciplineDto]),
    __metadata("design:returntype", Promise)
], DesciplineService.prototype, "create", null);
exports.DesciplineService = DesciplineService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], DesciplineService);
//# sourceMappingURL=desciplines.service.js.map