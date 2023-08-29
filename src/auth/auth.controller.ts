import {Body, Controller, Get, Post, Request, UseGuards} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { Public } from "./guards/public.guard";
import {AuthResponse, RegistrationDto} from "../models/user.dto";
import {ResponseObject} from "../models/response.model";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<ResponseObject<'user', AuthResponse>> {

    return {access_token: this.authService.generateAccessToken(req.user), ...req.user};
  }

  @Public()
  @Post('register')
  async register(@Body() registrationDto: RegistrationDto) {
    return this.authService.register(registrationDto);
  }


}
