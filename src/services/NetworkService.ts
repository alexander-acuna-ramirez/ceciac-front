import { api } from 'src/boot/axios';

export class NetworkService {
  public getUserNetwork(id: string | number) {
    return api.get('/api/v1/network-representative/' + id);
  }
  public networkMembers(id: string | number) {
    return api.get('api/v1/network/members/' + id);
  }
  public async uploadLogo(file: FormData, id: string | number) {
    return api.post('/api/v1/network/upload-logo/' + id, file);
  }
  public async uploadBanner(file: FormData, id: string | number) {
    return api.post('/api/v1/network/upload-banner/' + id, file);
  }
}

//network/upload-logo/{network}
