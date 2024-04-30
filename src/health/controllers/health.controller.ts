import { Controller, Get } from '@nestjs/common';
import { HealthService } from '../services/health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly heatlhService: HealthService) {}

  @Get('livez')
  getLivez(): string {
    return this.heatlhService.getLivez();
  }

  @Get('readyz')
  getReadyz(): string {
    return this.heatlhService.getReadyz();
  }
}
