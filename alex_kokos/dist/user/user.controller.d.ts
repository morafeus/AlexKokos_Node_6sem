import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getMe(user: {
        id: number;
        fio: string;
        role: string;
    }): {
        id: number;
        fio: string;
        role: string;
    };
    getTeacherDesc(desc: any): Promise<{
        fio: string;
        descipline: number;
        user_ident: number;
    }[]>;
    getStudent(user: any): Promise<{
        user_ident: number;
        fio: string;
        balance: number;
        email: string;
        user_password: string;
    }>;
    UpdateBalance({ balance }: {
        balance: any;
    }, user: any): Promise<{
        user_ident: number;
        fio: string;
        balance: number;
        email: string;
        user_password: string;
    }>;
    DeleteUser({ name }: {
        name: any;
    }, user: any): Promise<{
        user_ident: number;
        fio: string;
        email: string;
        user_password: string;
        descipline: number;
    } | {
        user_ident: number;
        fio: string;
        balance: number;
        email: string;
        user_password: string;
    }>;
}
