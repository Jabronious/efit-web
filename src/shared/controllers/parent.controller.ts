import { Controller, UseFilters, UseGuards } from '@nestjs/common';
import { AuthFilter } from '../../auth/filters/auth.filter';
import { AuthenticatedGuard } from '../guards/authenticated.guard';

@UseGuards(AuthenticatedGuard)
@UseFilters(AuthFilter)
@Controller('/')
export class ParentController {}
