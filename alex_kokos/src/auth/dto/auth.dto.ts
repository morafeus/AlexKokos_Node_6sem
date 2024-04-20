import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class AuthDto {
    @IsNotEmpty()
    @IsString()
    login: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}