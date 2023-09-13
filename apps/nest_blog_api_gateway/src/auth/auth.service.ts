import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { RegistrationDto } from "../v1/dto/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../v1/entities/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import {EventEmitter2} from "@nestjs/event-emitter";
import {UserRegisterEvent} from "../events/user.register.event";
import {SchedulerRegistry} from "@nestjs/schedule";

@Injectable()
export class AuthService {
  constructor(
      @InjectRepository(User) private userRepo: Repository<User>,
      private jwtService: JwtService,
      private eventEmitter: EventEmitter2,
      private scheduleRegistry: SchedulerRegistry
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
      let user = this.userRepo.create(credential);
      user = await user.save()
      this.eventEmitter.emit('user.register', new UserRegisterEvent(user.id, user.email))
      const timeout = setTimeout(() =>  console.log(`Start to establish socket connection to ${user.id}`))
      this.scheduleRegistry.addTimeout(`user_${user.id}_establish_ws`, timeout)


      return {user, access_token: this.generateAccessToken(user)}
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
