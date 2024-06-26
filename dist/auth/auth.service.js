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
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const unauthorized_error_1 = require("./errors/unauthorized.error");
const user_service_1 = require("../user/user.service");
let AuthService = exports.AuthService = class AuthService {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async login(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            name: user.name,
            idperfil: user.idperfil,
            perfil: user.perfil,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async validateUser(email, password) {
        if (!email || !password) {
            throw new unauthorized_error_1.UnauthorizedError('Credenciais de login não fornecidas corretamente.');
        }
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new unauthorized_error_1.UnauthorizedError('Nenhum usuário encontrado com o email fornecido.');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            return {
                ...user,
                password: undefined,
            };
        }
        throw new unauthorized_error_1.UnauthorizedError('O endereço de email ou a senha fornecida está incorreto.');
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map