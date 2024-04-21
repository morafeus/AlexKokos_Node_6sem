import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class TeacherDto {
    @IsNotEmpty()
    @IsString()
    login: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    descipline: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}