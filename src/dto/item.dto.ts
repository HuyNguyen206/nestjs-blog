import {IsBoolean, IsDefined, IsNotEmpty, IsNotEmptyObject, ValidateNested} from "class-validator";
import {PartialType} from "@nestjs/swagger";
import {CreateItemDetailDto} from "./item-detail.dto";
import {Transform, Type} from "class-transformer";
import {parseJson} from "../helper";


export class CreateItemDto {
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  is_public: boolean

  @IsNotEmptyObject()
  @IsDefined()
  @Type(() => CreateItemDetailDto)
  @ValidateNested()
  itemDetail: CreateItemDetailDto
}

export class UpdateItemDto extends PartialType(CreateItemDto){

}


