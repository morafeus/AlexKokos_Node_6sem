import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { CourseDto } from "src/auth/dto/course.dto";
export declare class CourseService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    getall(name: any, price: any, descipline: any, page: any, limit: any): Promise<{
        courses: any;
        count: any;
    }>;
    getallUser(name: any, price: any, descipline: any, page: any, limit: any, user: any, role: any): Promise<{
        courses: any;
        count: number;
    }>;
    getOne(id: number): Promise<{
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
    getOneMy(id: number): Promise<{
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
    create(dto: CourseDto): Promise<{
        course_id: number;
        course_name: string;
        course_cost: number;
        course_description: string;
        course_descipline: number;
    }>;
    delete(id: number): Promise<{
        course_id: number;
        course_name: string;
        course_cost: number;
        course_description: string;
        course_descipline: number;
    }>;
    buyCourse(course_id: any, user_id: any): Promise<{
        STC_id: number;
        course_id: number;
        student_id: number;
    }>;
    checkIsMy(course_id: any, user_id: any): Promise<{
        STC_id: number;
        course_id: number;
        student_id: number;
    }>;
    AddMaterial(id: number, name: string, info: string): Promise<{
        material_id: number;
        material_name: string;
        course_id: number;
        material_ingo: string;
    }>;
    GetMaterial(id: number): Promise<{
        material_id: number;
        material_name: string;
        course_id: number;
        material_ingo: string;
    }>;
    DelMaterial(id: number): Promise<{
        material_id: number;
        material_name: string;
        course_id: number;
        material_ingo: string;
    }>;
    GetStudsByTest(id: number): Promise<{
        Students: {
            fio: string;
            user_ident: number;
        };
        Tests: {
            test_name: string;
        };
    }[]>;
    AddTest(test: any, id: number): Promise<{
        test_id: number;
        test_name: string;
        test_desc: string;
        course_id: number;
    }>;
    GetTest(id: number): Promise<{
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
    DelTest(id: number): Promise<{
        test_id: number;
        test_name: string;
        test_desc: string;
        course_id: number;
    }>;
    SaveSuccess(id: number, ident: number): Promise<{
        status_id: number;
        test_id: number;
        student_id: number;
    }>;
}
