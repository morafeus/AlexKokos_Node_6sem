import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
export declare class UserService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    getallTeachers(): Promise<{
        descipline_id: number;
        descipline_name: string;
    }[]>;
    getallTeachersDesc(id: number): Promise<{
        user_ident: number;
        fio: string;
        descipline: number;
    }[]>;
    getStud(id: number): Promise<{
        user_ident: number;
        fio: string;
        balance: number;
        email: string;
        user_password: string;
    }>;
    UpdateBalance(summ: number, id: number): Promise<{
        user_ident: number;
        fio: string;
        balance: number;
        email: string;
        user_password: string;
    }>;
    DeleteUser(name: string): Promise<{
        user_ident: number;
        fio: string;
        balance: number;
        email: string;
        user_password: string;
    } | {
        user_ident: number;
        fio: string;
        email: string;
        user_password: string;
        descipline: number;
    }>;
}
