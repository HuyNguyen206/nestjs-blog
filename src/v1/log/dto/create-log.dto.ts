import {IsNotEmpty, IsString, MinLength} from "class-validator";

export class CreateLogDto {
    @IsNotEmpty()
    title: string;

    @IsString()
    @MinLength(3)
    body: string
}
