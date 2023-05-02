import { api } from 'src/boot/axios';

interface projectsParams {
  searchTerm?: string;
  type_id?: number;
}

export class ExploreService {
  public getProjectTypes() {
    return api.get('/api/v1/explore/types');
  }

  public getProjects(page = 1, searchTerm = '', type_id = '') {
    let endpoint = '/api/v1/explore/projects?page=' + page;
    if (searchTerm != '' && searchTerm != null) {
      endpoint += '&searchTerm=' + searchTerm;
    }

    if (type_id != '' && type_id != null) {
      endpoint += '&type_id=' + type_id;
    }

    return api.get(endpoint);
  }

  public getEvents(page = 1, start_date = '', end_date = '', searchTerm = '') {
    const queryParams = new URLSearchParams();

    queryParams.append('page', page.toString());
    queryParams.append('start_date', start_date);
    queryParams.append('end_date', end_date);
    queryParams.append('searchTerm', searchTerm);

    const endpoint = `/api/v1/explore/events?${queryParams.toString()}`;
    return api.get(endpoint);
  }
}
