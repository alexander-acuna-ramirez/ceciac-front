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
}
