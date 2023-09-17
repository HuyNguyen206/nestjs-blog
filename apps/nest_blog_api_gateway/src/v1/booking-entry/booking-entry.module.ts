import { Module } from "@nestjs/common";
import { BookingEntryService } from "./booking-entry.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import * as path from "path";
import { BookingEntryController } from "./booking-entry.controller";
import { GRPC_BOOKING_SERVICE } from "@app/common/constants/packages";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: GRPC_BOOKING_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: GRPC_BOOKING_SERVICE,
          protoPath: path.join(__dirname, "../grpc_booking_service.proto")
        }
      }
    ])
  ],
  controllers: [BookingEntryController],
  providers: [BookingEntryService]
})
export class BookingEntryModule {
}
