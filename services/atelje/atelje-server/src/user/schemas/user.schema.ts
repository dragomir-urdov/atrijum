import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop({
    unique: true,
    required: true,
  })
  username: string;
}

export const UserSchema = () => {
  const userSchema = SchemaFactory.createForClass(User);

  userSchema.pre('save', () => {
    console.log('User Schema => Pre Save');
  });

  return userSchema;
};
