import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-cred.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() authCredDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredDto);
  }

  @Post('/signin')
  signIn(@Body() authCredDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signIn(authCredDto);
  }
}
