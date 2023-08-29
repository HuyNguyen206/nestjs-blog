import {Injectable, NotFoundException} from '@nestjs/common';
import {AuthResponse, UpdateUserDto} from "../models/user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {Repository} from "typeorm";
import {ResponseObject} from "../models/response.model";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
    }

    async updateUser(currentUser: User, userDto: UpdateUserDto) {
        Object.assign(currentUser, userDto)

        return await this.userRepository.save(currentUser)
        // return  await this.userRepository.update({id: currentUser.id}, currentUser)
    }

    async findUserBy(nameField: string, value: any, withFollowings: boolean = false, withFollowers: boolean = false) {
        const relationships = [];

        if (withFollowers) {
            relationships.push('followers');
        }

        if (withFollowings) {
            relationships.push('followings');
        }

        const user = await this.userRepository.findOne({
            where: {[nameField]: value},
            relations: relationships
        })

        if (!user) {
            throw new NotFoundException('User not found')
        }

        return user
    }

    async followUser(currentUser: User, followUserName: string) {
        const followUser = await this.userRepository.findOne({
            where: { username: followUserName},
            relations: ['followers']
        })

        followUser.followers.push(currentUser)

        return await followUser.save()
    }

    async unfollowUser(currentUser: User, followUserName: string) {
        const followUser = await this.userRepository.findOne({
            where: { username: followUserName},
            relations: ['followers']
        })

        followUser.followers = followUser.followers.filter((follower) => {
            return follower.id !== currentUser.id
        })

        return await followUser.save()
    }


    // async unfollowUser(currentUser: User, unfollowUser: User) {
    //     user.load()
    //     currentUser.followings = [followUser];
    //
    //     return await currentUser.save()
    // }
}
