import mongoose from 'mongoose';
import { UserStatus } from '../user-status.enum';

export interface User extends mongoose.Document{
    username: string;
    password: string;
    status: UserStatus;
}