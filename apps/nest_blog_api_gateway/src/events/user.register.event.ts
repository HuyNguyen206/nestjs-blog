export class UserRegisterEvent {
    constructor(public readonly userId: number, public readonly email:string) {
    }
}