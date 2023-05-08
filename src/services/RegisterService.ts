import { User } from '@models/User';
import { api } from 'src/boot/axios';

export class RegisterService {
  public store(data: any) {
    return api.post('/api/v1/registration/register', data);
  }

  public countries() {
    return api.get('/api/v1/registration/countries');
  }

  public userTypeProfiles() {
    return api.get('/api/v1/registration/user-profile-type');
  }

  public professions() {
    return api.get('/api/v1/registration/professions');
  }
}
