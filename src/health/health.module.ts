import { Module } from '@nestjs/common';
import { HealthService } from './services/health.service';
import { HealthController } from './controllers/health.controller';

@Module({
  imports: [],
  providers: [HealthService],
  controllers: [HealthController],
})
export class HealthModule {}
