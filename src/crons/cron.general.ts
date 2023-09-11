import {Cron, CronExpression} from "@nestjs/schedule";

export class CronGeneral {
   @Cron(CronExpression.EVERY_SECOND, {name: 'delete_expire_user'})
    deleteExpireUsers() {
       // console.log('delete expire user')
   }
}