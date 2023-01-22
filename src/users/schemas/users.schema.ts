import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  discordId: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  discriminator: string;

  @Prop({ required: false })
  espn_s2: string;

  @Prop({ required: false })
  swid: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
