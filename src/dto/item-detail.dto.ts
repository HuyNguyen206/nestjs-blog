import {IsNotEmpty, IsNumber} from "class-validator";
import {PartialType} from "@nestjs/swagger";


export class CreateItemDetailDto {
  @IsNotEmpty()
  name: string

  @IsNumber()
  rating: number

  @IsNotEmpty()
  description: string;
}

export class UpdateItemDetailDto extends PartialType(CreateItemDetailDto){

}
