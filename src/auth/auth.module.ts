import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { LocalStrategy } from "./strategies/local.strategy";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { BullModule } from "@nestjs/bull";
import { EmailConsumer } from "./consumers/email.consumer";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]
  ),
    BullModule.registerQueue({
      name: 'send-email'
    }),
    PassportModule,
    JwtModule.register({
      // secret: jwtConstants.secret,
      secret: 'qwer@1234',
      signOptions: {expiresIn: '1h'}
    }),

  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, EmailConsumer],
})
export class AuthModule {}
