import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup() {
    return 'Sign Up';
  }

  login() {
    return 'Login';
  }

  logout() {
    return 'Logout';
  }
}
