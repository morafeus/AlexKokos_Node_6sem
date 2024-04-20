export declare class UserController {
    getMe(user: {
        id: number;
        fio: string;
        role: string;
    }): {
        id: number;
        fio: string;
        role: string;
    };
    editUser(): void;
}
