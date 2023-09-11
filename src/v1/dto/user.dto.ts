import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import {User} from "../entities/user.entity";
import {ApiProperty} from "@nestjs/swagger";

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({type: String, description: 'email'})
  email: string;

  @IsString()
  @MinLength(3)
  @ApiProperty({type: String, description: 'password'})
  password: string
}

export class RegistrationDto extends LoginDto{
  @IsString()
  @ApiProperty({type: String, description: 'username'})
  username: string

}

export class UpdateUserDto {
  @IsString()
  @ApiProperty({type: String, description: 'bio'})
  bio: string;

  @IsString()
  @ApiProperty({type: String, description: 'image'})
  image: string
}

export interface AuthResponse extends Partial<User>{
  access_token: string
}

