import mongoose from 'mongoose';
import { UserStatus } from '../user-status.enum';

export interface User extends mongoose.Document{
    username: string;
    email: string;
    password: string;
    status: UserStatus;
}