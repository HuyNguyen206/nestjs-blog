import { Inject, Injectable } from "@nestjs/common";
import {
  BOOKING_SERVICE_NAME,
  BookingServiceClient,
  CreateBookingDto, PaginationDto,
  UpdateBookingDto
} from "@app/common/types/grpc_booking_service";
import { ClientGrpc } from "@nestjs/microservices";
import { ReplaySubject } from "rxjs";
import { GRPC_BOOKING_SERVICE } from "@app/common/constants/packages";

@Injectable()
export class BookingEntryService {
  private bookingService: BookingServiceClient

  constructor(@Inject(GRPC_BOOKING_SERVICE) private  client: ClientGrpc) {
  }

  onModuleInit() {
    this.bookingService = this.client.getService<BookingServiceClient>(BOOKING_SERVICE_NAME)
  }
  create(createBookingDto: CreateBookingDto) {
    return  this.bookingService.createBooking(createBookingDto)
  }

  findAll() {
    return this.bookingService.findAllBookings({});
  }

  findOne(id: string) {
    return this.bookingService.findOneBooking({id});
  }

  update(id: string, updateBookingDto: UpdateBookingDto) {
    return this.bookingService.updateBooking({id, ...updateBookingDto})
  }

  remove(id: string) {
    return this.bookingService.removeBooking({ id });
  }

  emailUsers() {
    const users$ = new ReplaySubject<PaginationDto>()

    users$.next({page: 0, skip: 25})
    users$.next({page: 1, skip: 25})
    users$.next({page: 2, skip: 25})
    users$.next({page: 3, skip: 25})

    users$.complete()
    let chunkNumber = 1
    this.bookingService.queryBookings(users$).subscribe(bookings => {
      console.log('Chunk', chunkNumber, bookings);
      chunkNumber += 1
    })
  }
}
