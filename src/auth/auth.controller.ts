import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { UserRole } from '../user/user-role.enum';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Auth } from './decorators/auth.decorator';
import { Principal } from './decorators/principal.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('logout')
  logout() {}

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Principal() user) {
    return user;
  }

  @Auth(UserRole.Admin)
  @Get('admin')
  getSmth() {
    return 'Admin';
  }
}
