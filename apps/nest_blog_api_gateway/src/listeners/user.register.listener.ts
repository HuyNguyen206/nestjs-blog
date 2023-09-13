import {UserRegisterEvent} from "../events/user.register.event";
import {OnEvent} from "@nestjs/event-emitter";

export class UserRegisterListener {

    @OnEvent('user.register', {async: true})
    async sendWelcomeEmail(event: UserRegisterEvent){
        console.log(event, 'send email')
    }

    @OnEvent('user.register')
    logHistoryRegistration(event: UserRegisterEvent){
        console.log(event, 'log history')
    }
}