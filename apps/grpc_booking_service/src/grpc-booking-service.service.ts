import { Injectable } from '@nestjs/common';

@Injectable()
export class GrpcBookingServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
