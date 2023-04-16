import { api } from 'src/boot/axios';

class ProjectTypeService {
  public getAll() {
    return api.get('/api/v1/project-type');
  }
}

export default new ProjectTypeService();
