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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const decorater_1 = require("../auth/decorater");
const guard_1 = require("../auth/guard");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getMe(user) {
        return user;
    }
    getTeacherDesc(desc) {
        return this.userService.getallTeachersDesc(desc);
    }
    getStudent(user) {
        console.log(user.id);
        if (user.role === 'student') {
            return this.userService.getStud(user.id);
        }
        else
            throw new common_1.ForbiddenException('not enough privilege');
    }
    UpdateBalance({ balance }, user) {
        console.log(user.user_ident);
        if (user.role === 'student') {
            return this.userService.UpdateBalance(balance, user.user_ident);
        }
        else
            throw new common_1.ForbiddenException('not enough privilege');
    }
    DeleteUser({ name }, user) {
        console.log(user.user_ident);
        if (user.role === 'admin') {
            return this.userService.DeleteUser(name);
        }
        else
            throw new common_1.ForbiddenException('not enough privilege');
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, decorater_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getMe", null);
__decorate([
    (0, common_1.Get)('getTeacherDesc/:desc'),
    __param(0, (0, common_1.Param)('desc')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getTeacherDesc", null);
__decorate([
    (0, common_1.Get)('getStudent'),
    __param(0, (0, decorater_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getStudent", null);
__decorate([
    (0, common_1.Post)('balance'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorater_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "UpdateBalance", null);
__decorate([
    (0, common_1.Post)('deleteUser'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorater_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "DeleteUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map