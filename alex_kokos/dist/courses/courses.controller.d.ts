import { CourseDto } from 'src/auth/dto/course.dto';
import { CourseService } from './courses.service';
export declare class CoursesController {
    private courseService;
    constructor(courseService: CourseService);
    GetAll(body: {
        name: string;
        price: number;
        descipline: number;
        page: number;
        limit: number;
    }): Promise<any>;
    Create(dto: CourseDto, user: {
        id: number;
        fio: string;
        role: string;
    }): Promise<{
        course_id: number;
        course_name: string;
        course_cost: number;
        course_description: string;
        course_descipline: number;
    }>;
}
