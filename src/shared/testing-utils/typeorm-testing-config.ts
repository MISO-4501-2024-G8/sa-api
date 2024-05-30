import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/Entities/user.entity';


export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [
      UserEntity
    ],
    synchronize: true,
    keepConnectionAlive: true,
  }),
  TypeOrmModule.forFeature([
    UserEntity
  ]),
];
