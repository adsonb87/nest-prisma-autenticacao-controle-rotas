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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const NotFoundError_1 = require("../common/errors/types/NotFoundError");
const users_repository_1 = require("./repositories/users.repository");
let UserService = exports.UserService = class UserService {
    constructor(repository) {
        this.repository = repository;
    }
    async create(createUserDto) {
        const saltRounds = 10;
        try {
            const retornoEmail = await this.repository.findUnique(createUserDto.email);
            if (createUserDto.password.length < 6) {
                throw new NotFoundError_1.NotFoundError(`Password deve conter no mínimo 6 caracteres.`);
            }
            else if (retornoEmail) {
                throw new NotFoundError_1.NotFoundError(`Email já cadastrado.`);
            }
            else {
                const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
                const createdUser = await this.repository.create({
                    ...createUserDto,
                    password: hashedPassword,
                });
                return {
                    ...createdUser,
                    password: undefined,
                };
            }
        }
        catch (error) {
            throw new NotFoundError_1.NotFoundError(`${error}`);
        }
    }
    async createPerfis() {
        return await this.repository.findPerfis();
    }
    async findByEmail(email) {
        const user = await this.repository.findUnique(email);
        if (!user) {
            throw new NotFoundError_1.NotFoundError('Usuário não encontrado.');
        }
        return user;
    }
    async findAll() {
        const user = await this.repository.findAll();
        if (!user) {
            throw new NotFoundError_1.NotFoundError('Usuário não encontrado.');
        }
        return user;
    }
    async findOne(id) {
        const user = await this.repository.findOne(id);
        if (!user) {
            throw new NotFoundError_1.NotFoundError('Usuário não encontrado.');
        }
        return user;
    }
    update(id, updateUserDto) {
        return this.repository.update(id, updateUserDto);
    }
    remove(id) {
        return this.repository.remove(id);
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UserService);
//# sourceMappingURL=user.service.js.map