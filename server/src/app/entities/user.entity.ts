import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserStatus } from '../auth/user-status.enum';
import { Item } from './item.entity';

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

    @OneToMany(() => Item, (item) => item.user)
    items: Item[];
}