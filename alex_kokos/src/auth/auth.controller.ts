import { Body, Controller, ForbiddenException, Post, UseGuards, Request, Res} from "@nestjs/common";
import { dot } from "node:test/reporters";
import { AuthService } from "./auth.service";
import { GetUser } from "./decorater";
import { AuthDto, LoginDto, TeacherDto } from "./dto";
import { JwtGuard } from "./guard";
import { Response } from "express";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto);
    }

    @Post('signin')
    signin(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.signin(dto, res);
        
    }

    @Post('teacher')  
    @UseGuards(JwtGuard)
    teacher(@Body() dto: TeacherDto, @GetUser() user : {id: number, fio: string, role:string}){
        if(user.role == 'admin'){
            return this.authService.createTeacher(dto);
        }
        else
            throw new ForbiddenException('not enough privilege')
    }
}
