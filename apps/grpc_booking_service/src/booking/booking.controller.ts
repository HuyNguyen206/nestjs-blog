import { Controller } from '@nestjs/common';
import { BookingService } from './booking.service';
import {
  BookingServiceController,
  BookingServiceControllerMethods,
  CreateBookingDto, FindOneBookingDto, PaginationDto,
  UpdateBookingDto
} from "@app/common/types/grpc_booking_service";
import {Observable} from "rxjs";

@Controller()
@BookingServiceControllerMethods()
export class BookingController implements BookingServiceController{
  constructor(private readonly bookingService: BookingService) {}

  createBooking(createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  findAllBookings() {
    return this.bookingService.findAll();
  }

  findOneBookings(findOneBookingDto: FindOneBookingDto) {
    return this.bookingService.findOne(findOneBookingDto.id);
  }

  updateBooking(updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(updateBookingDto.id, updateBookingDto);
  }

  removeUser(findOneBookingDto: FindOneBookingDto) {
    return this.bookingService.remove(findOneBookingDto.id);
  }

  queryUsers(paginationDtoStream: Observable<PaginationDto>) {
    return this.bookingService.queryUsers(paginationDtoStream)
  }
}
