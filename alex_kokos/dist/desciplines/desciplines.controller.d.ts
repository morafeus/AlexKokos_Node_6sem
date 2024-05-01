import { DesciplineDto } from 'src/auth/dto';
import { DesciplineService } from './desciplines.service';
export declare class DesciplinesController {
    private desciplineService;
    constructor(desciplineService: DesciplineService);
    getAll(): Promise<{
        descipline_id: number;
        descipline_name: string;
    }[]>;
    Create(dto: DesciplineDto, user: {
        id: number;
        fio: string;
        role: string;
    }): Promise<{
        descipline_id: number;
        descipline_name: string;
    }>;
}
