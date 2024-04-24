import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, LoginDto, TeacherDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signup(dto: AuthDto): Promise<void>;
    signin(dto: LoginDto, res: Response): Promise<{
        access_token: string;
    }>;
    createTeacher(dto: TeacherDto): Promise<{
        user_ident: number;
        fio: string;
        email: string;
        user_password: string;
        descipline: string;
    }>;
    signToken(userId: number, login: string, res: Response): Promise<{
        access_token: string;
    }>;
}
