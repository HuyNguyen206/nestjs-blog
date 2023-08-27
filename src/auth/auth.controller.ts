import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, RegistrationDto } from "../models/user.dto";
import { Public } from "./guards/public.guard";
import { Request } from "express";

@Controller("users")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('register')
  register(@Body() credential: RegistrationDto) {
    return this.authService.register(credential)
  }

  @Post("login")
  login(@Body() credential: LoginDto) {
    return this.authService.login(credential)

  }

  @Public()
  @Post("me")
  me(@Req() req: Request)
  {
    // return req.user
  }


}
