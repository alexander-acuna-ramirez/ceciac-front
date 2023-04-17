import { api } from 'src/boot/axios';

export class ProjectTypeService {
  public getAll() {
    return api.get('/api/v1/project-type');
  }
}
