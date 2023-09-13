import { Module } from '@nestjs/common';
import { GrpcBookingServiceController } from './grpc-booking-service.controller';
import { GrpcBookingServiceService } from './grpc-booking-service.service';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [BookingModule],
  controllers: [GrpcBookingServiceController],
  providers: [GrpcBookingServiceService],
})
export class GrpcBookingServiceModule {}
