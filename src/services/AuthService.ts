import { api } from 'src/boot/axios';
import { AuthRequest } from 'src/models/Auth';

export class AuthService {
  public async login(email: string, password: string) {
    const data: AuthRequest = {
      email: email,
      password: password,
    };
    await api.get('sanctum/csrf-cookie');
    return api.post('/api/login', data);
  }

  public async recoverPassword(email: string) {
    return api.post('api/v1/recover-password', { email });
  }

  public async checkToken(token: string) {
    return api.get('api/v1/check-recover-token?token=' + token);
  }

  public async resetPassword(password: string, token: string) {
    return api.post('api/v1/reset-password?token=' + token, { password });
  }
}
