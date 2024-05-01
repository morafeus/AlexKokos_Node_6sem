import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { DesciplineDto } from "src/auth/dto";
export declare class DesciplineService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    getall(): Promise<{
        descipline_id: number;
        descipline_name: string;
    }[]>;
    create(dto: DesciplineDto): Promise<{
        descipline_id: number;
        descipline_name: string;
    }>;
}
