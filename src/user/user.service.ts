import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './Entities/user.entity';
import { Repository } from 'typeorm';
import {
    BusinessError,
    BusinessLogicException,
} from '../shared/errors/business-errors';
import { UserDto } from './DTOs/user.dto';
import { SportUserEntity } from './Entities/sportUser.entity';
import { ThirdUserEntity } from './Entities/thirdUser.entity';
import { encrypt, decrypt } from '../utils/encrypt_decrypt';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTypePlanDto } from './DTOs/update-type-plan.dto';
const expirationTime = 2 * 45 * 60 * 1000;

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity, 'userConnection')
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(SportUserEntity, 'userConnection')
        private readonly sportUserRepository: Repository<SportUserEntity>,
        @InjectRepository(ThirdUserEntity, 'userConnection')
        private readonly thirdUserRepository: Repository<ThirdUserEntity>,
    ) { }

    parseDate(dateString: string): Date {
        const [day, month, year] = dateString.split('-');
        return new Date(`${year}-${month}-${day}`);
    }

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }
    async findOne(id: string): Promise<UserEntity> {
        const usuario: UserEntity =
            await this.userRepository.findOne({
                where: { id },
            });
        if (!usuario)
            throw new BusinessLogicException(
                'The user with the given id was not found',
                BusinessError.NOT_FOUND,
            );
        return usuario;
    }
    async create(usuario: UserDto): Promise<any> {
        const userExist: UserEntity =
            await this.userRepository.findOne({
                where: { email: usuario.email },
            });
        if (userExist) {
            throw new BusinessLogicException(
                'The user with the given email already exists',
                BusinessError.BAD_REQUEST,
            );
        }

        console.log(usuario);

        let userType = 0;
        switch (usuario.user_type) {
            case 'S':
                userType = 1;
                break;
            case 'T':
                userType = 2;
                break;
            case 'A':
                userType = 3;
                break;
        }
        
        const encryptPWD = encrypt(usuario.password, process.env.TOKEN_SECRET);
        const idUser = uuidv4().split('-')[0];
        const expiration_token = Date.now() + expirationTime;
        const token = jwt.sign({
            email: usuario.email,
            encryptPWD,
            exp: expiration_token
        }, process.env.TOKEN_SECRET)

        const userEntity: UserEntity = {
            id: idUser,
            email: usuario.email,
            password: encryptPWD,
            doc_num: usuario.doc_num,
            doc_type: usuario.doc_type,
            name: usuario.name,
            phone: usuario.phone,
            user_type: userType,
            token: token,
            expiration_token: new Date(expiration_token),
        }
        await this.userRepository.save(userEntity);

        if(usuario.user_type == 'S'){
            const sportUserEntity: SportUserEntity = {
                id: userEntity.id,
                gender: usuario.gender,
                age: usuario.age,
                weight: usuario.weight,
                height: usuario.height,
                birth_country: usuario.birth_country,
                birth_city: usuario.birth_city,
                residence_country: usuario.residence_country,
                residence_city: usuario.residence_city,
                residence_seniority: usuario.residence_seniority,
                sports: usuario.sports,
                typePlan: usuario.typePlan ?? 'basico',
                acceptance_notify: usuario.acceptance_notify,
                acceptance_tyc: usuario.acceptance_tyc,
                acceptance_personal_data: usuario.acceptance_personal_data,
            }
            await this.sportUserRepository.save(sportUserEntity);
        } else if (usuario.user_type == 'T'){
            const parseDate:Date = this.parseDate(usuario.company_creation_date);
            const thirdUserEntity: ThirdUserEntity = {
                id: userEntity.id,
                company_creation_date: parseDate,
                company_address: usuario.company_address,
                contact_name: usuario.contact_name,
                company_description: usuario.company_description,
                company_status: 1,
            }
            await this.thirdUserRepository.save(thirdUserEntity);
        }
        return userEntity;
    }

    async update(
        id: string,
        userRepository: UserEntity,
    ): Promise<UserEntity> {
        const persistedUser: UserEntity =
            await this.userRepository.findOne({ where: { id } });
        if (!persistedUser)
            throw new BusinessLogicException(
                'The ingredient with the given id was not found',
                BusinessError.NOT_FOUND,
            );

        return await this.userRepository.save({
            ...persistedUser,
            ...userRepository,
        });
    }
    async delete(id: string) {
        const usuario: UserEntity =
            await this.userRepository.findOne({ where: { id } });
        if (!usuario)
            throw new BusinessLogicException(
                'The ingredient with the given id was not found',
                BusinessError.NOT_FOUND,
            );

        await this.userRepository.remove(usuario);
    }

    async updateTypePlan(userId: string, updateTypePlanDto: UpdateTypePlanDto): Promise<SportUserEntity> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new BusinessLogicException(
                'The user with the given id was not found',
                BusinessError.NOT_FOUND,
            );
        }
        if (user.user_type !== 1) { // assuming typePlan is only for users of type 'S'
            throw new BusinessLogicException(
                'The user is not of type SportUser',
                BusinessError.BAD_REQUEST,
            );
        }
        const sportUser = await this.sportUserRepository.findOne({ where: { id: userId } });
        if (!sportUser) {
            throw new BusinessLogicException(
                'The sport user with the given id was not found',
                BusinessError.NOT_FOUND,
            );
        }
        sportUser.typePlan = updateTypePlanDto.typePlan;
        return await this.sportUserRepository.save(sportUser);
    }
}
