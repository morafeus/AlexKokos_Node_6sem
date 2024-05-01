import { IsString } from "class-validator"

export class DesciplineDto {
    @IsString()
    descipline_name: string;
}