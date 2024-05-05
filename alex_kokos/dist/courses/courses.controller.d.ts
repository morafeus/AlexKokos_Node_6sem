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
        Desciplines: {
            descipline_name: string;
        };
        TeacherToCourse: {
            Teachers: {
                fio: string;
                Desciplines: {
                    descipline_name: string;
                };
            };
        }[];
        course_id: number;
        course_name: string;
        course_cost: number;
        course_description: string;
        Tests: {
            test_id: number;
            test_name: string;
            test_desc: string;
        }[];
    }>;
    GetOneMy(id: any): Promise<{
        Desciplines: {
            descipline_name: string;
        };
        TeacherToCourse: {
            Teachers: {
                fio: string;
                Desciplines: {
                    descipline_name: string;
                };
            };
        }[];
        course_id: number;
        course_name: string;
        course_cost: number;
        course_description: string;
        Materials: {
            material_id: number;
            material_name: string;
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
    }, user: any): Promise<{
        courses: any;
        count: number;
    }>;
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
    Delete({ id }: {
        id: any;
    }, user: any): Promise<{
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
    AddMaterial({ id, name, description }: {
        id: any;
        name: any;
        description: any;
    }, user: any): Promise<{
        material_id: number;
        material_name: string;
        course_id: number;
        material_ingo: string;
    }>;
    GetMaterial({ id }: {
        id: any;
    }): Promise<{
        material_id: number;
        material_name: string;
        course_id: number;
        material_ingo: string;
    }>;
    DelMaterial({ id }: {
        id: any;
    }): Promise<{
        material_id: number;
        material_name: string;
        course_id: number;
        material_ingo: string;
    }>;
    GetStudsByTest({ id }: {
        id: any;
    }, user: any): Promise<{
        Students: {
            fio: string;
            user_ident: number;
        };
        Tests: {
            test_name: string;
        };
    }[]>;
    AddTest({ test, id }: {
        test: any;
        id: any;
    }, user: any): Promise<{
        test_id: number;
        test_name: string;
        test_desc: string;
        course_id: number;
    }>;
    GetTest({ id }: {
        id: any;
    }, user: any): Promise<{
        test_name: string;
        test_desc: string;
        Answers: {
            answer_id: number;
            question: string;
            answers: string;
            answer_count: number;
            answer_right: number;
            test_id: number;
        }[];
    }>;
    DelTest({ id }: {
        id: any;
    }, user: any): Promise<{
        test_id: number;
        test_name: string;
        test_desc: string;
        course_id: number;
    }>;
    SaveSuccess({ id }: {
        id: any;
    }, user: any): Promise<{
        status_id: number;
        test_id: number;
        student_id: number;
    }>;
}
