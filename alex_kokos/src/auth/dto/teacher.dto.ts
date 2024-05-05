import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class TeacherDto {
    @IsNotEmpty()
    @IsString()
    fio: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    descipline: number;

    @IsNotEmpty()
    @IsString()
    password: string;
}