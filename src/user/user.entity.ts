import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    doc_num: string;

    @Column()
    doc_type: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    user_type: number;

    @Column()
    token: string;

    @Column()
    expiration_token: Date;
}