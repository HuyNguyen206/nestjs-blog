import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {BookingModule} from "./booking/booking.module";
import * as path from "path";
import {GRPC_BOOKING_SERVICE} from "@app/common/constants/packages";

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        BookingModule,
        {
            transport: Transport.GRPC,
            options: {
                protoPath: path.join(__dirname, '../grpc_booking_service.proto'),
                package:GRPC_BOOKING_SERVICE
            }
        }
    );
    await  app.listen()
}

bootstrap();
