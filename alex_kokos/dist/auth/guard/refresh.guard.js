"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtJwtGuard = void 0;
const passport_1 = require("@nestjs/passport");
class RtJwtGuard extends (0, passport_1.AuthGuard)('jwt-refresh') {
    constructor() {
        super();
    }
}
exports.RtJwtGuard = RtJwtGuard;
//# sourceMappingURL=refresh.guard.js.map