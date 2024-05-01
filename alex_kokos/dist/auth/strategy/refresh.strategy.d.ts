/// <reference types="cookie-parser" />
import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { Request } from "express";
declare const RtJwtStrategy_base: new (...args: any[]) => Strategy;
export declare class RtJwtStrategy extends RtJwtStrategy_base {
    private config;
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    validate(req: Request, payload: {
        sub: number;
        fio: string;
        role: string;
    }): Promise<any>;
}
export {};
