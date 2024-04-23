"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationMiddleware = exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
let AuthMiddleware = exports.AuthMiddleware = class AuthMiddleware {
    use(req, res, next) {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new common_1.UnauthorizedException('Token não fornecido');
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Token inválido');
        }
    }
};
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)()
], AuthMiddleware);
let AuthorizationMiddleware = exports.AuthorizationMiddleware = class AuthorizationMiddleware {
    use(req, res, next) {
        const userRole = req.user.perfil.nome;
        if (userRole === 'ADMIN' || (userRole === 'USER' && req.method === 'GET')) {
            next();
        }
        else {
            throw new common_1.UnauthorizedException('Acesso não autorizado');
        }
    }
};
exports.AuthorizationMiddleware = AuthorizationMiddleware = __decorate([
    (0, common_1.Injectable)()
], AuthorizationMiddleware);
//# sourceMappingURL=auth.middleware.js.map