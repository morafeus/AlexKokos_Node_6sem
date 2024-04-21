import { AuthService } from "./auth.service";
import { AuthDto, LoginDto, TeacherDto } from "./dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    signin(dto: LoginDto): Promise<{
        access_token: string;
    }>;
    teacher(dto: TeacherDto, user: {
        id: number;
        fio: string;
        role: string;
    }): Promise<{
        user_ident: number;
        fio: string;
        email: string;
        user_password: string;
        descipline: string;
    }>;
}
