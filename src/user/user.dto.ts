import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserDto {


    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    doc_num: string;

    @IsNotEmpty()
    @IsString()
    doc_type: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    user_type: string;

    @IsString()
    gender: string;

    @IsNumber()
    age: number;

    @IsNumber()
    weight: number;

    @IsNumber()
    height: number;

    @IsString()
    birth_country: string;

    @IsString()
    birth_city: string;

    @IsString()
    residence_country: string;

    @IsString()
    residence_city: string;

    @IsNumber()
    residence_seniority: number;

    @IsString()
    sports: string;

    @IsString()
    typePlan: string;

    @IsNumber()
    acceptance_notify: number;

    @IsNumber()
    acceptance_tyc: number;

    @IsNumber()
    acceptance_personal_data: number;

    @IsString()
    company_creation_date: string;

    @IsString()
    company_address: string;

    @IsString()
    contact_name: string;

    @IsString()
    company_description: string;

    @IsNumber()
    company_status: number;
}
