import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './Entities/user.entity';
import { SportUserEntity } from './Entities/sportUser.entity';
import { ThirdUserEntity } from './Entities/thirdUser.entity';
import { UserDto } from './DTOs/user.dto';
import { UpdateTypePlanDto } from './DTOs/update-type-plan.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity], 'userConnection'),
    TypeOrmModule.forFeature([SportUserEntity], 'userConnection'),
    TypeOrmModule.forFeature([ThirdUserEntity], 'userConnection'),
    UserDto,
    UpdateTypePlanDto
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
