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
        return this.courseService.getall(body.name, body.price, body.descipline, body.page, body.limit);
    }
    Create(dto, user) {
        if (user.role === 'admin') {
            return this.courseService.create(dto);
        }
        else
            throw new common_1.ForbiddenException('not enough privilege');
    }
};
exports.CoursesController = CoursesController;
__decorate([
    (0, common_1.Get)('getall'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "GetAll", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorater_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_dto_1.CourseDto, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "Create", null);
exports.CoursesController = CoursesController = __decorate([
    (0, common_1.Controller)('courses'),
    __metadata("design:paramtypes", [courses_service_1.CourseService])
], CoursesController);
//# sourceMappingURL=courses.controller.js.map