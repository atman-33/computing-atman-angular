import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, Validate } from 'class-validator';
import { UserStatus } from '../../users/user-status.enum';
import { EqualToProperty } from '../validators/equal-to-property.validator';
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    password: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Validate(EqualToProperty, ['password'])
    confirmPassword: string;

    @IsEnum(UserStatus)
    status: UserStatus;
}