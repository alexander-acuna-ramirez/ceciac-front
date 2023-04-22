import { api } from 'src/boot/axios';
import { Project } from '@models/Project';

export class ProjectService {
  public store(project: Project) {
    return api.post('/api/v1/project', project);
  }

  public show(id: string | number) {
    return api.get('/api/v1/project/' + id);
  }
  public loadNetworkProjects(
    page: string | number,
    perpage: string | number,
    sortBy: string | null = null,
    network: number | string | null = null
  ) {
    let url: string = '/api/v1/project?page=' + page + '&perpage=' + perpage;
    if (network != null) {
      url += '&network=' + network;
    }
    if (sortBy != null) {
      url += '&sortBy=' + sortBy;
    }
    return api.get(url);
  }
}
