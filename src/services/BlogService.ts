import { api } from 'src/boot/axios';
import { BlogPost } from 'src/models';

export class BlogService {
  public async getCategories() {
    return api.get('/api/v1/blog/categories');
  }

  public async storePost(data: BlogPost) {
    return api.post('/api/v1/blog', data);
  }
  public async showPost(post: string | number) {
    return api.get('/api/v1/blog/' + post);
  }

  public async createTags(data: number[], post: number | string) {
    return api.post('api/v1/blog/tags/create/' + post, { 'tag_ids': data });
  }

  public async uploadImage(post: number | string, data: FormData) {
    return api.post('api/v1/blog/image/create/' + post, data);
  }

  public async update(post: number | string, data:any) {
    return api.put('/api/v1/blog/' + post, data);
  }

  public async delete(post: string | number) {
    return api.delete('/api/v1/blog/' + post);
  }

  public async blogNetwork(network: string, params: URLSearchParams) {
    return api.get('api/v1/blog/network/' + network + '?' + params.toString());
  }

  public checkAccess(id: string) {
    return api.get('api/v1/blog/access/' + id);
  }

  public updatePostContent(id: string | number, content: string) {
    return api.put('api/v1/blog/update/content/' + id, { content })
  }
}
