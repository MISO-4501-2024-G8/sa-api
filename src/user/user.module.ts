import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { SportUserEntity } from './sportUser.entity';
import { ThirdUserEntity } from './thirdUser.entity';
import { UserDto } from './user.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity], 'userConnection'),
    TypeOrmModule.forFeature([SportUserEntity], 'userConnection'),
    TypeOrmModule.forFeature([ThirdUserEntity], 'userConnection'),
    UserDto
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
