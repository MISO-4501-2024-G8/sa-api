import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('sport_user')
export class SportUserEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    gender: string;

    @Column()
    age: number;

    @Column()
    weight: number;

    @Column()
    height: number;

    @Column()
    birth_country: string;

    @Column()
    birth_city: string;

    @Column()
    residence_country: string;

    @Column()
    residence_city: string;

    @Column()
    residence_seniority: number;

    @Column()
    sports: string;

    @Column()
    typePlan: string;

    @Column()
    acceptance_notify: number;

    @Column()
    acceptance_tyc: number;

    @Column()
    acceptance_personal_data: number;
}
