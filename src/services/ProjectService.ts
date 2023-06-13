import { api } from 'src/boot/axios';
import { Project } from '@models/Project';

export class ProjectService {
  public store(project: Project) {
    return api.post('/api/v1/project', project);
  }

  public uploadProjectFiles(formData: FormData, project: string | number) {
    return api.post('/api/v1/project/upload-files/' + project, formData);
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

  public participate(project: string | number) {
    return api.get('api/v1/project/participate/' + project);
  }

  public projectParticipation(project: string | number) {
    return api.get('api/v1/project/project-participation/' + project);
  }

  public storeProjectTags(project: string | number, tags: number[]) {
    return api.post('api/v1/project/tags/' + project, { tags });
  }
}

/*
Route::get('project/participate/{project}', [ProjectController::class, 'participate']);
        Route::get('project/project-participation/{project}', [ProjectController::class, 'projectParticipation']);
*/
