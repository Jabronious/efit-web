import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getLivez(): string {
    return 'its alive';
  }

  getReadyz(): string {
    return 'its ready';
  }
}
