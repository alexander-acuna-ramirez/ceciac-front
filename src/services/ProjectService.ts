import { api } from 'src/boot/axios';
import { Project } from '@models/Project';

export class ProjectService {
  public store(project: Project) {
    return api.post('/api/v1/project', project);
  }

  public show(id: string | number) {
    return api.get('/api/v1/project/' + id);
  }
}
