import { Test, TestingModule } from '@nestjs/testing';
import { GrpcBookingServiceController } from './grpc-booking-service.controller';
import { GrpcBookingServiceService } from './grpc-booking-service.service';

describe('GrpcBookingServiceController', () => {
  let grpcBookingServiceController: GrpcBookingServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GrpcBookingServiceController],
      providers: [GrpcBookingServiceService],
    }).compile();

    grpcBookingServiceController = app.get<GrpcBookingServiceController>(GrpcBookingServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(grpcBookingServiceController.getHello()).toBe('Hello World!');
    });
  });
});
