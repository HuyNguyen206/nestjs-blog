import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { RegistrationDto } from "../dto/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { MailerService } from "@nestjs-modules/mailer";
import * as path from "path";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
              private jwtService: JwtService,
              private mailService: MailerService
  ) {
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepo.findOne({where: {email}})

    if (user && await user.isCorrectPassword(password)) {
      return user;
    }

    return null;
  }

  async register(credential: RegistrationDto) {
    try {
      const user = this.userRepo.create(credential);
      await this.mailService.sendMail({
        to: user.email,
        subject: 'Welcome',
        // template: './welcome',
        template: path.join(process.cwd(), 'dist', 'emails', 'templates', `welcome.hbs`),
        context: {
          name: user.username
        }

      })
      return {user: {...(await user.save()).toJSON(), access_token: this.generateAccessToken(user)}}

    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  generateAccessToken(user: User){
    const payload = { sub: user.id };
    return this.jwtService.sign(payload)
  }

  async findUserById(userId: number): Promise<User> {
    return await this.userRepo.findOne({where:{id: userId}})
  }
}
