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
    Headers,
} from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { UserService } from './user.service';
import { UserDto } from './DTOs/user.dto';
import { UserEntity } from './Entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { UpdateTypePlanDto } from './DTOs/update-type-plan.dto';
import { LoginUserDto } from './DTOs/login-user.dto';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';


@Controller('user')
@UseInterceptors(BusinessErrorsInterceptor)
export class UserController {
    private readonly logger = new Logger(UserController.name);
    constructor(private readonly userService: UserService) { }
    @Get()
    async findAll(): Promise<UserEntity[]> {
        return this.userService.findAll();
    }
    
    @Post()
    async create(@Body() userDto: UserDto) {
        try {
            return await this.userService.create(userDto);
        } catch (e) {
            console.log(e);
            this.logger.debug('Error creating user');
            this.logger.error(e.message);
            throw e;
        }
    }

    @Put('typePlanUser/:userId')
    async updateTypePlan(@Param('userId') userId: string, @Body() updateTypePlanDto: UpdateTypePlanDto) {
        try {
            return await this.userService.updateTypePlan(userId, updateTypePlanDto);
        } catch (e) {
            console.log(e);
            this.logger.debug('Error updating user type plan');
            this.logger.error(e.message);
            throw e;
        }
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        try {
            return await this.userService.login(loginUserDto.email, loginUserDto.password);
        } catch (e) {
            console.log(e);
            this.logger.debug('Error login user');
            this.logger.error(e.message);
            throw e;
        }
    }

    @Get('validateToken')
    async validateToken(@Headers('Authorization') authorization: string) {
        try {
            // Verificar y registrar el encabezado de autorización
            //console.log('Authorization Header:', authorization);
            if (!authorization || !authorization.startsWith('Bearer ')) {
                throw new BusinessLogicException('Invalid authorization header', BusinessError.BAD_REQUEST);
            }

            const token = authorization.split(' ')[1];
            //console.log('Extracted Token:', token);
            return await this.userService.validateToken(token);
        } catch (e) {
            this.logger.debug('Error validating token');
            this.logger.error(e.message);
            throw e;
        }
    }

    @Get(':userId')
    async findOne(@Param('userId') userId: string) {
        console.log('userId:', userId);
        return await this.userService.findOne(userId);
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
}
