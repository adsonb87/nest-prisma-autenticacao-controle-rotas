import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
export declare class UserService {
    private readonly repository;
    constructor(repository: UsersRepository);
    create(createUserDto: CreateUserDto): Promise<UserEntity>;
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
    findByEmail(email: string): Promise<{
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
    }>;
    findAll(): Promise<({
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
    })[]>;
    findOne(id: number): Promise<{
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
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
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
    }>;
    remove(id: number): Promise<{
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
    }>;
}
