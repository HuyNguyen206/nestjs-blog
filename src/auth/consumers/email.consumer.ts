import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import * as path from "path";
import { MailerService } from "@nestjs-modules/mailer";

@Processor('send-email')
export class EmailConsumer {

  constructor( private mailService: MailerService) {
  }
  @Process('register')
  async register(job: Job<unknown>) {
    console.log(job);
    const data = job.data as any
    const user = data.user

    await this.mailService.sendMail({
      to: user.email,
      subject: 'Welcome',
      // template: './welcome',
      template: path.join(process.cwd(), 'dist', 'emails', 'templates', `welcome.hbs`),
      context: {
        name: user.username
      }

    })

    console.log('send success');
  }
}