import { IsNotEmpty } from 'class-validator';

export class ConnectDto {
  @IsNotEmpty()
  espn_s2: string;

  @IsNotEmpty()
  swid: string;
}
