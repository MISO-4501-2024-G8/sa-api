// src/user/dto/update-type-plan.dto.ts
import { IsString } from 'class-validator';

export class UpdateTypePlanDto {
    @IsString()
    typePlan: string;
}
