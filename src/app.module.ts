import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { HealthModule } from './health/health.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { SportUserEntity } from './user/sportUser.entity';
import { ThirdUserEntity } from './user/thirdUser.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'userConnection',
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
      database: 'db_user',
      entities: [UserEntity, SportUserEntity, ThirdUserEntity],
      dropSchema: false,
      synchronize: true,
      keepConnectionAlive: true,
    }),
    ItemsModule, 
    HealthModule, 
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
