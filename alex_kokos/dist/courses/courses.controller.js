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
exports.CoursesController = void 0;
const common_1 = require("@nestjs/common");
const decorater_1 = require("../auth/decorater");
const course_dto_1 = require("../auth/dto/course.dto");
const guard_1 = require("../auth/guard");
const courses_service_1 = require("./courses.service");
let CoursesController = class CoursesController {
    constructor(courseService) {
        this.courseService = courseService;
    }
    GetAll(body) {
        console.log(body.price);
        return this.courseService.getall(body.name, body.price, body.descipline, body.page, body.limit);
    }
    GetOne(id) {
        return this.courseService.getOne(id);
    }
    GetOneMy(id) {
        return this.courseService.getOneMy(id);
    }
    GetAllUser(body, user) {
        console.log(user);
        if (user.role === 'student' || user.role === 'teacher') {
            return this.courseService.getallUser(body.name, body.price, body.descipline, body.page, body.limit, user.user_ident, user.role);
        }
        else
            throw new common_1.ForbiddenException('not enough privilege');
    }
    Create(dto, user) {
        if (user.role === 'admin') {
            return this.courseService.create(dto);
        }
        else
            throw new common_1.ForbiddenException('not enough privilege');
    }
    Delete({ id }, user) {
        if (user.role === 'admin') {
            return this.courseService.delete(id);
        }
        else
            throw new common_1.ForbiddenException('not enough privilege');
    }
    BuyCourse({ id }, user) {
        if (user.role === 'student') {
            return this.courseService.buyCourse(id, user.user_ident);
        }
        else
            throw new common_1.ForbiddenException('not enough privilege');
    }
    CheckIsMy({ id }, user) {
        if (user.role === 'student') {
            return this.courseService.checkIsMy(id, user.user_ident);
        }
        else
            throw new common_1.ForbiddenException('not enough privilege');
    }
    AddMaterial({ id, name, description }, user) {
        if (user.role === 'teacher') {
            return this.courseService.AddMaterial(id, name, description);
        }
        else
            throw new common_1.ForbiddenException('not enough privilege');
    }
    GetMaterial({ id }) {
        return this.courseService.GetMaterial(id);
    }
    DelMaterial({ id }) {
        return this.courseService.DelMaterial(id);
    }
    GetStudsByTest({ id }, user) {
        if (user.role === 'teacher') {
            return this.courseService.GetStudsByTest(id);
        }
        else
            throw new common_1.ForbiddenException('not enough privilege');
    }
    AddTest({ test, id }, user) {
        if (user.role === 'teacher') {
            return this.courseService.AddTest(test, id);
        }
        else
            throw new common_1.ForbiddenException('not enough privilege');
    }
    GetTest({ id }, user) {
        if (user.role === 'student') {
            return this.courseService.GetTest(id);
        }
        else
            throw new common_1.ForbiddenException('not enough privilege');
    }
    DelTest({ id }, user) {
        if (user.role === 'teacher') {
            return this.courseService.DelTest(id);
        }
        else
            throw new common_1.ForbiddenException('not enough privilege');
    }
    SaveSuccess({ id }, user) {
        if (user.role === 'student') {
            return this.courseService.SaveSuccess(id, user.user_ident);
        }
        else
            throw new common_1.ForbiddenException('not enough privilege');
    }
};
exports.CoursesController = CoursesController;
__decorate([
    (0, common_1.Post)('getall'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "GetAll", null);
__decorate([
    (0, common_1.Get)('getone/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "GetOne", null);
__decorate([
    (0, common_1.Get)('getoneMy/:id'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "GetOneMy", null);
__decorate([
    (0, common_1.Post)('getallUser'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorater_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "GetAllUser", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorater_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_dto_1.CourseDto, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "Create", null);
__decorate([
    (0, common_1.Post)('deleteCourse'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorater_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "Delete", null);
__decorate([
    (0, common_1.Post)('buy'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorater_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "BuyCourse", null);
__decorate([
    (0, common_1.Post)('checkIsMy'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorater_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "CheckIsMy", null);
__decorate([
    (0, common_1.Post)('addMaterial'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorater_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "AddMaterial", null);
__decorate([
    (0, common_1.Post)('getMaterial'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "GetMaterial", null);
__decorate([
    (0, common_1.Post)('delMaterial'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "DelMaterial", null);
__decorate([
    (0, common_1.Post)('getStudsByTest'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorater_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "GetStudsByTest", null);
__decorate([
    (0, common_1.Post)('addTest'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorater_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "AddTest", null);
__decorate([
    (0, common_1.Post)('getTest'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorater_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "GetTest", null);
__decorate([
    (0, common_1.Post)('delTest'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorater_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "DelTest", null);
__decorate([
    (0, common_1.Post)('saveSuccess'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorater_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "SaveSuccess", null);
exports.CoursesController = CoursesController = __decorate([
    (0, common_1.Controller)('courses'),
    __metadata("design:paramtypes", [courses_service_1.CourseService])
], CoursesController);
//# sourceMappingURL=courses.controller.js.map