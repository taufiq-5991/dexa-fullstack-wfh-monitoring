import { Controller, Post, Body, HttpStatus, UseGuards, Headers } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseWrapper } from '@/common/decorators/swagger/wrapper-response.decorator';
import { ErrorResponse } from '@/common/response/error.response';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { JWTPayloadDto, LoginResultDto } from './dtos/jwt-payload.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

@ApiTags('Auth')
@ApiBearerAuth('JWT-auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Login' })
    @ApiResponseWrapper({
        type: LoginResultDto,
        isArray: true,
    })
    @ApiResponseWrapper({
        type: ErrorResponse,
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Error',
    })
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<LoginResultDto> {
        // No token required for login
        try {
            return this.authService.login(loginDto);
        } catch (e) {
            throw e;
        }
    }

    @ApiOperation({ summary: 'Verify Token' })
    @UseGuards(JwtAuthGuard) // Use the JWT Auth Guard to validate the token
    @ApiResponseWrapper({
        type: JWTPayloadDto,
    })
    @ApiResponseWrapper({
        type: ErrorResponse,
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Error',
    })
    @Post('verifyToken')
    async verifyToken(@Headers('Authorization') authHeader: string): Promise<JWTPayloadDto> {
        try {
            // Extract the token from the Authorization header
            const token = authHeader?.split(' ')[1]; // Remove "Bearer" prefix
            if (!token) {
                throw new Error('Token not provided');
            }
            return this.authService.verifyToken(token);
        } catch (e) {
            throw e;
        }
    }
}