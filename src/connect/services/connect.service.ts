import { Injectable } from '@nestjs/common';
import { EncryptService } from 'src/encrypt/services/encrypt.serivce';

@Injectable()
export class ConnectService {
  constructor(private readonly encryptService: EncryptService) {}

  async encrypt(unencryptedString: string): Promise<string> {
    return this.encryptService.encrypt(unencryptedString);
  }
}
