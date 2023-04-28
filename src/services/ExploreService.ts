import { api } from 'src/boot/axios';

interface projectsParams {
  searchTerm?: string;
  type_id?: number;
}

export class ExploreService {
  public getCategories() {
    return api.get('/api/v1/explore/categories');
  }

  public getProjects(params?: projectsParams) {
    const endpoint = '/api/v1/explore/projects';
    return api.get(endpoint, { params });
  }
}
