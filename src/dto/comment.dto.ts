import {IsDefined, IsNotEmpty, IsString} from "class-validator";

export class CommentDto {

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  body: string;
}
