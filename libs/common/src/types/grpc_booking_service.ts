/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "grpc_booking_service";

export interface Empty {
}

export interface Bookings {
  bookings: Booking[];
}

export interface PaginationDto {
  page: number;
  skip: number;
}

export interface CreateBookingDto {
  name: string;
  startDate: string;
  endDate: string;
}

export interface UpdateBookingDto {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  media: Media | undefined;
}

export interface FindOneBookingDto {
  id: string;
}

export interface Booking {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  media: Media | undefined;
}

export interface Media {
  image?: string | undefined;
  order?: number | undefined;
}

export const GRPC_BOOKING_SERVICE_PACKAGE_NAME = "grpc_booking_service";

export interface BookingServiceClient {
  createBooking(request: CreateBookingDto): Observable<Booking>;

  findAllBookings(request: Empty): Observable<Bookings>;

  findOneBooking(request: FindOneBookingDto): Observable<Booking>;

  updateBooking(request: UpdateBookingDto): Observable<Booking>;

  removeBooking(request: FindOneBookingDto): Observable<Booking>;

  queryBookings(request: Observable<PaginationDto>): Observable<Bookings>;
}

export interface BookingServiceController {
  createBooking(request: CreateBookingDto): Promise<Booking>;

  findAllBookings(request: Empty): Promise<Bookings> | Observable<Bookings> | Bookings;

  findOneBooking(request: FindOneBookingDto): Promise<Booking> | Observable<Booking> | Booking;

  updateBooking(request: UpdateBookingDto): Promise<Booking> | Observable<Booking> | Booking;

  removeBooking(request: FindOneBookingDto): Promise<Booking> | Observable<Booking> | Booking;

  queryBookings(request: Observable<PaginationDto>): Observable<Bookings>;
}

export function BookingServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createBooking",
      "findAllBookings",
      "findOneBooking",
      "updateBooking",
      "removeBooking",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("BookingService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["queryBookings"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("BookingService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const BOOKING_SERVICE_NAME = "BookingService";