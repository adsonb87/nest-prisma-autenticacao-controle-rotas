import { UserEntity } from '../entities/user.entity';
export declare class CreateUserDto extends UserEntity {
    email: string;
    password: string;
    name: string;
    idPerfil: number;
}
