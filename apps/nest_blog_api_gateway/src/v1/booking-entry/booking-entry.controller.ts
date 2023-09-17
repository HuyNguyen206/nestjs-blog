import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateBookingDto, UpdateBookingDto } from "@app/common/types/grpc_booking_service";
import { BookingEntryService } from "./booking-entry.service";

@Controller()
export class BookingEntryController {
  constructor(private readonly bookingService: BookingEntryService) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get()
  findAllBelow() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(id);
  }

  @Post('email')
  emailUsers() {
    return this.bookingService.emailUsers();
  }
}
