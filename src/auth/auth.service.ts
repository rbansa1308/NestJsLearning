import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-cred.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(authCredDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredDto);
  }

  async signIn(authCredDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredDto;
    const user = await this.userRepository.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      console.log('login success');
    } else
      throw new UnauthorizedException(
        'login failed please check your credentials',
      );
  }
}
