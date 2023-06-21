import { api } from 'src/boot/axios';

export class NetworkService {
  public getUserNetwork(id: string | number) {
    return api.get('/api/v1/network-representative/' + id);
  }
  public networkMembers(id: string | number) {
    return api.get('api/v1/network/members/' + id);
  }
  public networkMembersManage(network: string | number, { page = 1, perpage = 10, sortBy = 'name', sortOrder = 'desc', searchTerm = '', rank = '', } = {}) {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      perpage: perpage.toString(),
      sortBy,
      sortOrder,
      rank,
      searchTerm,
    });
    const endpoint = '/api/v1/network/members-manage/' + network.toString() + '?' + queryParams.toString();
    return api.get(endpoint);

  }

  public networkSearchUser(network: string | number, email: string) {
    return api.get('/api/v1/search-users/network?network=' + network + '&email=' + email);
  }

  public networkAddMember(network: string | number, { user = '', rank = '' } = {}){
    return api.post('/api/v1/network/add/' + network, {user, rank});
  }

  public async uploadLogo(file: FormData, id: string | number) {
    return api.post('/api/v1/network/upload-logo/' + id, file);
  }
  public async uploadBanner(file: FormData, id: string | number) {
    return api.post('/api/v1/network/upload-banner/' + id, file);
  }
  public async getNetworks() {
    return api.get('api/v1/networks');
  }
}

//network/upload-logo/{network}
