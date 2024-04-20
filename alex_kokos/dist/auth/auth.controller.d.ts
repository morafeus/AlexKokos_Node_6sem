import { AuthService } from "./auth.service";
import { AuthDto, LoginDto } from "./dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    signin(dto: LoginDto): Promise<{
        access_token: string;
    }>;
}
