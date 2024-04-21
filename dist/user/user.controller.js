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
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const update_user_dto_1 = require("./dto/update-user.dto");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const user_entity_1 = require("./entities/user.entity");
const common_2 = require("@nestjs/common");
const is_public_decorator_1 = require("../auth/decorators/is-public.decorator");
let UserController = exports.UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(createUserDto) {
        try {
            const retorno = await this.userService.create(createUserDto);
            return {
                message: 'sucesso',
                result: retorno,
            };
        }
        catch (error) {
            throw new common_2.NotFoundException({
                message: 'erro',
                error: error.message,
            });
        }
    }
    async createPerfis() {
        return await this.userService.createPerfis();
    }
    async findOne(id) {
        try {
            const retorno = await this.userService.findOne(+id);
            if (!retorno) {
                throw new common_2.NotFoundException('Registro não encontrado');
            }
            return {
                message: 'sucesso',
                result: retorno,
            };
        }
        catch (error) {
            throw new common_2.NotFoundException({
                message: 'erro',
                error: error.message,
            });
        }
    }
    async getMe(currentUser) {
        try {
            if (!currentUser) {
                throw new common_2.NotFoundException('Registro não encontrado');
            }
            return {
                message: 'sucesso',
                data: currentUser,
            };
        }
        catch (error) {
            return {
                message: 'erro',
                error: error.message,
            };
        }
    }
    async findAll() {
        try {
            const retorno = await this.userService.findAll();
            if (!retorno) {
                throw new common_2.NotFoundException('Registro não encontrado');
            }
            return {
                message: 'sucesso',
                result: retorno,
            };
        }
        catch (error) {
            throw new common_2.NotFoundException({
                message: 'erro',
                error: error.message,
            });
        }
    }
    async update(id, updateUserDto) {
        try {
            const retorno = await this.userService.update(+id, updateUserDto);
            console.log(retorno, common_1.HttpStatus.OK);
            return {
                message: 'sucesso',
                result: retorno,
            };
        }
        catch (error) {
            throw new common_2.NotFoundException({
                message: 'erro',
                error: error.message,
            });
        }
    }
    async remove(id) {
        try {
            const retorno = await this.userService.remove(+id);
            return {
                message: 'sucesso',
                result: retorno,
            };
        }
        catch (error) {
            throw new common_2.NotFoundException({
                message: 'erro',
                error: error.message,
            });
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, is_public_decorator_1.IsPublic)(),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/perfis'),
    (0, is_public_decorator_1.IsPublic)(),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createPerfis", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/me'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMe", null);
__decorate([
    (0, common_1.Get)(),
    (0, is_public_decorator_1.IsPublic)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('Usuario'),
    (0, common_1.Controller)('/api/v1/usuario'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map