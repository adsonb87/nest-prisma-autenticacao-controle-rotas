import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
export declare class UsersRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
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
    createPerfis(perfis: any): Promise<{
        id: number;
        nome: string;
    }>;
    findPerfis(): Promise<({
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
    findUnique(email: string): Promise<{
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
