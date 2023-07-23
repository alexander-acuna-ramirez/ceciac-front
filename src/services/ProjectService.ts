import { api } from 'src/boot/axios';
import { Project } from 'src/models/Project';

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

  public checkOwnership(project: string | number) {
    return api.get('api/v1/project/check-ownership/' + project);
  }

  public updateBasicInfo(data: { name: string, type_id: number, description: string, tags: number[] }, project: string | number) {
    return api.put('api/v1/project/' + project, data);
  }


  public projectParticipants(
    project: string,
    page = 1,
    perpage = 10,
    sortBy = '',
    sortOrder = 'desc',
    searchTerm = '',
    start_date = '',
    end_date = ''
  ) {

    const queryParams = new URLSearchParams({
      page: page.toString(),
      perpage: perpage.toString(),
      sortBy,
      sortOrder,
      start_date,
      end_date,
      searchTerm,
    });


    return api.get('api/v1/project/participants/' + project + '?' + queryParams.toString());

  }

  public updateProjectContent(project: string | number, content: string) {
    return api.put('api/v1/project/update-content/' + project, {
      content
    });
  }

  public deleteProject(project: string | number) {
    return api.delete('api/v1/project/' + project);
  }

  public deleteProjectFiles(project: string | number, files: number[]) {
    const filesData = files.map(e => e.toString()).concat(',');
    return api.delete('api/v1/project/delete-files/' + project + '?deleted=' + filesData);
  }
}

