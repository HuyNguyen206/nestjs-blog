import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import {User} from "../entities/user.entity";

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(3)
  password: string
}

export class RegistrationDto extends LoginDto{
  @IsString()
  username: string
}

export class UpdateUserDto {
  @IsString()
  bio: string;

  @IsString()
  image: string
}

export interface AuthResponse extends Partial<User>{
  access_token: string
}

