import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Logger,
    Param,
    Post,
    Put,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { UserService } from './user.service';
import { UserDto } from './DTOs/user.dto';
import { UserEntity } from './Entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { UpdateTypePlanDto } from './DTOs/update-type-plan.dto';


@Controller('user')
@UseInterceptors(BusinessErrorsInterceptor)
export class UserController {
    private readonly logger = new Logger(UserController.name);
    constructor(private readonly userService: UserService) { }
    @Get()
    async findAll(): Promise<UserEntity[]> {
        return this.userService.findAll();
    }
    @Get(':userId')
    async findOne(@Param('userId') userId: string) {
        return await this.userService.findOne(userId);
    }
    @Post()
    async create(@Body() userDto: UserDto) {
        try {
            return await this.userService.create(userDto);
        } catch (e) {
            console.log(e);
            this.logger.debug('Error creating user');
            this.logger.error(e.message);
        }
    }
    @Put(':userId')
    async update(
        @Param('userId') userId: string,
        @Body() userDto: UserDto,
    ) {
        const ingrediente: UserEntity = plainToInstance(
            UserEntity,
            userDto,
        );
        return await this.userService.update(userId, ingrediente);
    }

    @Delete(':userId')
    @HttpCode(204)
    async delete(@Param('userId') userId: string) {
        return await this.userService.delete(userId);
    }


    @Put('typePlanUser/:userId')
    async updateTypePlan(@Param('userId') userId: string, @Body() updateTypePlanDto: UpdateTypePlanDto) {
        try {
            return await this.userService.updateTypePlan(userId, updateTypePlanDto);
        } catch (e) {
            console.log(e);
            this.logger.debug('Error updating user type plan');
            this.logger.error(e.message);
        }
    }
}
