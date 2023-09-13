import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "./public.guard";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
}