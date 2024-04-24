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
exports.RotasController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
let RotasController = exports.RotasController = class RotasController {
    async buscarAdmin() {
        try {
            return {
                message: 'sucesso',
                result: 'Usuário Admin',
            };
        }
        catch (error) {
            throw new common_1.NotFoundException({
                message: 'erro',
                error: error.message,
            });
        }
    }
    async buscarUser() {
        try {
            return {
                message: 'sucesso',
                result: 'Usuário user',
            };
        }
        catch (error) {
            throw new common_1.NotFoundException({
                message: 'erro',
                error: error.message,
            });
        }
    }
    async buscarBusca() {
        try {
            return {
                message: 'sucesso',
                result: 'Usuário busca',
            };
        }
        catch (error) {
            throw new common_1.NotFoundException({
                message: 'erro',
                error: error.message,
            });
        }
    }
    async buscarDev() {
        try {
            return {
                message: 'sucesso',
                result: 'Usuário dev',
            };
        }
        catch (error) {
            throw new common_1.NotFoundException({
                message: 'erro',
                error: error.message,
            });
        }
    }
};
__decorate([
    (0, common_1.Get)('/admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.FOUND),
    openapi.ApiResponse({ status: common_1.HttpStatus.FOUND }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RotasController.prototype, "buscarAdmin", null);
__decorate([
    (0, common_1.Get)('/user'),
    (0, common_1.HttpCode)(common_1.HttpStatus.FOUND),
    openapi.ApiResponse({ status: common_1.HttpStatus.FOUND }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RotasController.prototype, "buscarUser", null);
__decorate([
    (0, common_1.Get)('/busca'),
    (0, common_1.HttpCode)(common_1.HttpStatus.FOUND),
    openapi.ApiResponse({ status: common_1.HttpStatus.FOUND }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RotasController.prototype, "buscarBusca", null);
__decorate([
    (0, common_1.Get)('/dev'),
    (0, common_1.HttpCode)(common_1.HttpStatus.FOUND),
    openapi.ApiResponse({ status: common_1.HttpStatus.FOUND }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RotasController.prototype, "buscarDev", null);
exports.RotasController = RotasController = __decorate([
    (0, common_1.Controller)('/api/v1/rotas')
], RotasController);
//# sourceMappingURL=rotas.controller.js.map