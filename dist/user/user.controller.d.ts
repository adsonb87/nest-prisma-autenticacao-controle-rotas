import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        result: UserEntity;
    }>;
    createPerfis(): Promise<({
        User: {
            id: number;
            email: string;
            password: string;
            name: string;
            idPerfil: number;
        }[];
    } & {
        id: number;
        nome: string;
    })[]>;
    findOne(id: string): Promise<{
        message: string;
        result: {
            perfil: {
                id: number;
                nome: string;
            };
        } & {
            id: number;
            email: string;
            password: string;
            name: string;
            idPerfil: number;
        };
    }>;
    getMe(currentUser: UserEntity): Promise<{
        message: string;
        data: UserEntity;
        error?: undefined;
    } | {
        message: string;
        error: any;
        data?: undefined;
    }>;
    findAll(): Promise<{
        message: string;
        result: ({
            perfil: {
                id: number;
                nome: string;
            };
        } & {
            id: number;
            email: string;
            password: string;
            name: string;
            idPerfil: number;
        })[];
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        message: string;
        result: {
            perfil: {
                id: number;
                nome: string;
            };
        } & {
            id: number;
            email: string;
            password: string;
            name: string;
            idPerfil: number;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
        result: {
            perfil: {
                id: number;
                nome: string;
            };
        } & {
            id: number;
            email: string;
            password: string;
            name: string;
            idPerfil: number;
        };
    }>;
}
