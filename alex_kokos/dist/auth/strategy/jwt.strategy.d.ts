/// <reference types="cookie-parser" />
import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { Request } from "express";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    validate(payload: {
        sub: number;
        fio: string;
    }): Promise<{
        user_ident: number;
        fio: string;
        role: string;
    } | {
        user_ident: number;
        fio: string;
        email: string;
        user_password: string;
        descipline: string;
    } | {
        user_ident: number;
        fio: string;
        balance: number;
        email: string;
        user_password: string;
    }>;
    static fromTokenAsCookies(req: Request): any;
}
export {};
