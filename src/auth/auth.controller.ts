import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRole } from '../user/user-role.enum';
import { SignInBodyDto } from './dto/sign-in-body.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Auth } from './decorators/auth.decorator';
import { Principal } from './decorators/principal.decorator';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign in' })
  @Post('login')
  async signIn(@Body() signInDto: SignInBodyDto) {
    const signInResponse = await this.authService.signIn(signInDto);
    return new SignInResponseDto(signInResponse);
  }

  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    const signUpResponse = await this.authService.signUp(signUpDto);
    return new SignUpResponseDto(signUpResponse);
  }

  @Post('logout')
  logout() {}

  @Auth()
  @Get('profile')
  getProfile(@Principal() user) {
    return user;
  }

  @Auth([UserRole.Admin])
  @Get('admin')
  getSmth() {
    return 'Admin';
  }
}
