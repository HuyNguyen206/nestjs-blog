import { Body, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { LoginDto, RegistrationDto } from "../models/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>, private jwtService: JwtService) {
  }

  async register(credential: RegistrationDto) {
    try {
      const user = this.userRepo.create(credential);
      return await user.save();
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async login({ email, password }: LoginDto) {
    try {
      const user = await this.userRepo.findOne({
        where: { email }
      });
      if (!user) {
        throw new UnauthorizedException('Email is invalid');
      }

      const isCorrectPassword = await user.isCorrectPassword(password)
      if (!isCorrectPassword) {
        throw new UnauthorizedException('Password is invalid');
      }

      const payload = {sub: user.id, email: user.email}

      return {
        access_token: await this.jwtService.signAsync(payload)
      }

    } catch (err) {
      if (err instanceof UnauthorizedException) {
        throw err
      }

      throw new InternalServerErrorException(err.message);
    }
  }
}
