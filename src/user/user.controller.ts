import {Body, Request, Controller, Get, Put, UseGuards, Param, Post, Delete} from '@nestjs/common';
import {UserService} from './user.service';
import {UpdateUserDto} from "../models/user.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get('me')
    me(@Request() req) {
        return req.user;
    }

    @Get('profile/:username?')
    async profile(@Param('username') username: string, @Request() req) {
        const user = await this.userService.findUserBy('username', username, true, true)

        return user.withFollower(req.user)
    }

    @Put()
    updateUser(@Body() userDto: UpdateUserDto, @Request() req) {
        return this.userService.updateUser(req.user, userDto);
    }

    @Post('follow/:username')
    followUser( @Request() req, @Param('username') username: string) {
        return this.userService.followUser(req.user, username);
    }

    @Delete('unfollow/:username')
    unfollowUser( @Request() req, @Param('username') username: string) {
        return this.userService.unfollowUser(req.user, username);
    }
}
