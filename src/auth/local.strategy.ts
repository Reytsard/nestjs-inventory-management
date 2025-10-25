import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.userService.findUserByUsername(username);
    if (!user) {
      return new UnauthorizedException();
    }
    return {
      uuid: user.uuid,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
      isActive: user.isActive,
      username: user.username,
    };
  }
}
