import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRole } from '../user/user-role.enum';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Auth } from './decorators/auth.decorator';
import { Principal } from './decorators/principal.decorator';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { SignUpResponseDto } from './dto/sign-up-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    const signInResponse = await this.authService.signIn(signInDto);
    return new SignInResponseDto(signInResponse);
  }

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
