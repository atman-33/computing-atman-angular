import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserStatus } from '../auth/user-status.enum';

@Entity({ name: 'user' })
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: UserStatus
    })
    status: UserStatus;
}