import { Body, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { LoginDto, RegistrationDto } from "../models/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>, private jwtService: JwtService
  ) {
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepo.findOne({where: {email}})

    if (user && await user.isCorrectPassword(password)) {
      return user;
    }

    return null;
  }

  // async register(credential: RegistrationDto) {
  //   try {
  //     const user = this.userRepo.create(credential);
  //     return await user.save();
  //   } catch (err) {
  //     throw new InternalServerErrorException(err.message);
  //   }
  // }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  // }
}
