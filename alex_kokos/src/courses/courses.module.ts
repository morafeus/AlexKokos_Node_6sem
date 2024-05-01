import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { CoursesController } from "./courses.controller";
import { CourseService } from "./courses.service";


@Module({ 
    imports: [JwtModule.register({})],
    controllers: [CoursesController],
    providers: [CourseService]
})

export class CoursesModule{}