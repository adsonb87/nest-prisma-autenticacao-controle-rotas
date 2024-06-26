"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidationMiddleware = void 0;
const common_1 = require("@nestjs/common");
const LoginRequestBody_1 = require("../models/LoginRequestBody");
const class_validator_1 = require("class-validator");
let LoginValidationMiddleware = exports.LoginValidationMiddleware = class LoginValidationMiddleware {
    async use(req, res, next) {
        const body = req.body;
        const loginRequestBody = new LoginRequestBody_1.LoginRequestBody();
        loginRequestBody.email = body.email;
        loginRequestBody.password = body.password;
        const validations = await (0, class_validator_1.validate)(loginRequestBody);
        if (validations.length) {
            throw new common_1.BadRequestException(validations.reduce((acc, curr) => {
                return [...acc, ...Object.values(curr.constraints)];
            }, []));
        }
        next();
    }
};
exports.LoginValidationMiddleware = LoginValidationMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoginValidationMiddleware);
//# sourceMappingURL=login-validation.middleware.js.map