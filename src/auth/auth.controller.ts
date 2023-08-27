import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { Public } from "./guards/public.guard";

@Controller("users")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }


  @Get('me')
  getProfile(@Request() req) {
    console.log(123);
    return req.user;
  }

}
