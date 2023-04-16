import { api } from 'src/boot/axios';
import { AuthRequest } from 'src/models/Auth';

class AuthService {
  public login(email: string, password: string) {
    const data: AuthRequest = {
      email: email,
      password: password,
    };
    return api.post('/api/login', data);
  }
}

export default new AuthService();
