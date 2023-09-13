import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { Public } from "./guards/public.guard";
import {AuthResponse, LoginDto, RegistrationDto} from "../v1/dto/user.dto";
import {ResponseObject} from "../v1/dto/response.model";
import {ApiBody, ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";

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
  @UseInterceptors(FileInterceptor('avatar'))
  async register(@Body() registrationDto: RegistrationDto, @UploadedFile() file: Express.Multer.File) {
    console.log(file)
    return this.authService.register(registrationDto);
  }


}
