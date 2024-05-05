import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CourseDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    cost: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    descipline: number;

    @IsNumber()
    @IsNotEmpty()
    teacher: number;
}