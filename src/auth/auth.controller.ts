import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { Public } from "./guards/public.guard";
import {AuthResponse, LoginDto, RegistrationDto} from "../dto/user.dto";
import {ResponseObject} from "../dto/response.model";
import {ApiBody, ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiUnauthorizedResponse} from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({description: 'User login'})
  @ApiUnauthorizedResponse({description: 'Invalid credentials'})
  @ApiBody({type: LoginDto})
  async login(@Request() req, credential: LoginDto): Promise<ResponseObject<'user', AuthResponse>> {

    return {access_token: this.authService.generateAccessToken(req.user), ...req.user};
  }

  @Public()
  @Post('register')
  @ApiCreatedResponse({description: 'User registration'})
  @ApiBody({type: RegistrationDto})
  async register(@Body() registrationDto: RegistrationDto) {
    return this.authService.register(registrationDto);
  }


}
