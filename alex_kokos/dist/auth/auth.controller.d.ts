import { AuthService } from "./auth.service";
import { AuthDto, LoginDto, TeacherDto } from "./dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: AuthDto): Promise<{
        user_ident: number;
        fio: string;
        balance: number;
        email: string;
        user_password: string;
    }>;
    signin(dto: LoginDto): Promise<any>;
    teacher(dto: TeacherDto, user: {
        id: number;
        fio: string;
        role: string;
    }): Promise<{
        user_ident: number;
        fio: string;
        email: string;
        user_password: string;
        descipline: number;
    }>;
    refresh(req: any): Promise<any>;
    logout(user: {
        id: number;
        fio: string;
        role: string;
    }): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
