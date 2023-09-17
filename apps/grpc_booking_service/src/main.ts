import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import * as path from "path";
import {GRPC_BOOKING_SERVICE} from "@app/common/constants/packages";
import {GrpcBookingServiceModule} from "./grpc-booking-service.module";

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        GrpcBookingServiceModule,
        {
            transport: Transport.GRPC,
            options: {
                protoPath: path.join(__dirname, '../grpc_booking_service.proto'),
                package:GRPC_BOOKING_SERVICE
            }
        }
    );
    await app.listen()
}

bootstrap();
