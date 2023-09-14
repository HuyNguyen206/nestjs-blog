import {Injectable, NotFoundException, OnModuleInit} from '@nestjs/common';
import {
    Booking,
    Bookings,
    CreateBookingDto,
    PaginationDto,
    UpdateBookingDto
} from "@app/common/types/grpc_booking_service";
import {randomUUID} from 'crypto'
import {Observable, Subject} from "rxjs";
import {DeepPartial} from "typeorm";

@Injectable()
export class BookingService implements OnModuleInit {
    private bookings: Booking[] = []

    onModuleInit(): any {
        for (let i = 1; i <= 100; i++) {
            this.create({
                name: (Math.random() + 1).toString(36).substring(7),
                startDate: (new Date()).toISOString(),
                endDate: (new Date()).toISOString(),
            })
        }
    }

    async create(createBookingDto: CreateBookingDto) {
        const newBooking: Booking = {
            ...createBookingDto,
            id: randomUUID(),
            media: {},
            isActive: true
        }

        this.bookings = [...this.bookings, newBooking];

        return newBooking
    }

    findAll() {
        return {bookings: this.bookings};
    }

    findOne(id: string) {

        return this.bookings.find(book => book.id === id);
    }

    update(id: string, updateBookingDto: UpdateBookingDto) {
        const index = this.bookings.findIndex(booking => booking.id === id);
        if (index === -1) {
            throw new NotFoundException()
        }

        this.bookings[index] = {...this.bookings[index], ...updateBookingDto}

        return this.bookings[index]
    }

    remove(id: string) {
        const index = this.bookings.findIndex(booking => booking.id === id);
        if (index === -1) {
            throw new NotFoundException()
        }

       return this.bookings.splice(index)[0]
    }

    queryBooks(paginationDtoStream: Observable<PaginationDto>): Observable<Bookings> {
        const subject = new Subject<Bookings>()

        const onNext = (paginationDto: PaginationDto) => {
            const start = (paginationDto.page - 1) * paginationDto.skip;
            subject.next({
                bookings: this.bookings.slice(start, start + paginationDto.skip)
            })
        }

        const onComplete = () => subject.complete()
        paginationDtoStream.subscribe({
            next: onNext,
            complete: onComplete
        })

        return subject.asObservable()
    }
}
