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
    getallUser(name: any, price: any, descipline: any, page: any, limit: any, user: any, role: any): Promise<any>;
    getOne(id: number): Promise<{
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
    create(dto: CourseDto): Promise<{
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
}
