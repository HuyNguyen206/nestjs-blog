import { Controller, Get } from '@nestjs/common';
import { GrpcBookingServiceService } from './grpc-booking-service.service';

@Controller()
export class GrpcBookingServiceController {
  constructor(private readonly grpcBookingServiceService: GrpcBookingServiceService) {}

  @Get()
  getHello(): string {
    return this.grpcBookingServiceService.getHello();
  }
}
