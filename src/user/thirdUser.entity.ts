import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('third_user')
export class ThirdUserEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    company_creation_date: Date;

    @Column()
    company_address: string;

    @Column()
    contact_name: string;

    @Column()
    company_description: string;

    @Column()
    company_status: number;
}