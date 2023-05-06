import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserStatus } from '../auth/user-status.enum';
import { Item } from './item.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'user' })
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    @Exclude({ toPlainOnly: true }) // toPlainOnly: レスポンスから除外する時はtrue
    password: string;

    @Column()
    status: UserStatus;

    @OneToMany(() => Item, (item) => item.user)
    items: Item[];
}