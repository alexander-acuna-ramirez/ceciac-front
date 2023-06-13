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

    public async blogNetwork(network: string, params: URLSearchParams) {
        return api.get('api/v1/blog/network/' + network + "?" + params.toString());
    }
}