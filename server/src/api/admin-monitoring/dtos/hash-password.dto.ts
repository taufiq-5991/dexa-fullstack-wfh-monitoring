import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class HashPasswordDto {
    @ApiProperty({
        description: 'password',
        example: 'Pass123!'
    })
    @IsNotEmpty()
    @IsString()
    @Length(8, 255)
    password: string;
}