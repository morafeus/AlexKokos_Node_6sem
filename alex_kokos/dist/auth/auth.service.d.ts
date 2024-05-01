import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, LoginDto, TeacherDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signup(dto: AuthDto): Promise<{
        user_ident: number;
        fio: string;
        balance: number;
        email: string;
        user_password: string;
    }>;
    signin(dto: LoginDto): Promise<any>;
    logout(userId: number, role: string): Promise<void>;
    createTeacher(dto: TeacherDto): Promise<{
        user_ident: number;
        fio: string;
        email: string;
        user_password: string;
        descipline: number;
    }>;
    signToken(userId: number, login: string, role: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    updateRt(userId: number, role: string, refresh_token: string): Promise<void>;
    refreshTokens(userId: number, role: string, rt: string): Promise<any>;
}
