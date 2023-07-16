import { api } from 'src/boot/axios';

export class ExploreService {
  public getProjectTypes() {
    return api.get('/api/v1/explore/types');
  }

  public getProjects({ page = 1, perpage = 10, sortBy = 'name', sortOrder = 'desc', start_date = '', end_date = '', searchTerm = '', category = [], institutions = [] } = {}) {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      perpage: perpage.toString(),
      sortBy,
      sortOrder,
      start_date,
      end_date,
      searchTerm,
      institutions: institutions.join(','),
      category: category.join(',')
    });

    const endpoint = `/api/v1/explore/projects?${queryParams.toString()}`;
    return api.get(endpoint);
  }


  public getEvents({ page = 1, perpage = 10, sortBy = 'title', sortOrder = 'desc', start_date = '', end_date = '', searchTerm = '', is_public = [], is_online = [], institutions = [] } = {}) {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      perpage: perpage.toString(),
      sortBy,
      sortOrder,
      start_date,
      end_date,
      searchTerm,
      institutions: institutions.join(','),
      is_public: is_public.join(','),
      is_online: is_online.join(','),
    });

    const endpoint = `/api/v1/explore/events?${queryParams.toString()}`;
    return api.get(endpoint);
  }




  public getBlog({ page = 1, perpage = 10, sortBy = 'title', sortOrder = 'desc', start_date = '', end_date = '', searchTerm = '', category = [], institutions = [] } = {}) {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      perpage: perpage.toString(),
      sortBy,
      sortOrder,
      start_date,
      end_date,
      searchTerm,
      institutions: institutions.join(','),
      category: category.join(',')
    });

    const endpoint = `/api/v1/explore/blog?${queryParams.toString()}`;
    return api.get(endpoint);
  }
}
