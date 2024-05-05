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
    }): Promise<{
        courses: any;
        count: any;
    }>;
    GetOne(id: any): Promise<{
        course_id: number;
        course_name: string;
        course_cost: number;
        course_description: string;
        Desciplines: {
            descipline_name: string;
        };
        TeacherToCourse: {
            Teachers: {
                Desciplines: {
                    descipline_name: string;
                };
                fio: string;
            };
        }[];
        Tests: {
            test_id: number;
            test_name: string;
            test_desc: string;
        }[];
    }>;
    GetAllUser(body: {
        name: string;
        price: number;
        descipline: number;
        page: number;
        limit: number;
        user: number;
        role: string;
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
    BuyCourse({ id }: {
        id: any;
    }, user: any): Promise<{
        STC_id: number;
        course_id: number;
        student_id: number;
    }>;
    CheckIsMy({ id }: {
        id: any;
    }, user: any): Promise<{
        STC_id: number;
        course_id: number;
        student_id: number;
    }>;
}
