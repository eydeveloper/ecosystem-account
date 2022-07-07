import {model, Schema} from 'mongoose';

interface IUser {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  avatar: {type: String},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

const User = model<IUser>('User', userSchema);

export default User;
