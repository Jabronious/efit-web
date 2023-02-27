import { Injectable } from '@nestjs/common';
import { createCipheriv, randomBytes } from 'crypto';

@Injectable()
export class ConnectService {
  private alg = 'aes-256-cbc';
  private initVector = randomBytes(16);
  private securitykey = randomBytes(32);

  constructor() {}

  encrypt(unencryptedString: string): string {
    const cipher = createCipheriv(this.alg, this.securitykey, this.initVector);

    let encryptedData = cipher.update(unencryptedString, 'utf-8', 'hex');

    encryptedData += cipher.final('hex');
    return encryptedData;
  }
}
