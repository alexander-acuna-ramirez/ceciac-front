import { api } from 'src/boot/axios';

export class NetworkService {
  public getUserNetwork(id: string | number) {
    return api.get('/api/v1/network-representative/' + id);
  }
}
