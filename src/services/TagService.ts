import { api } from 'src/boot/axios';

export class TagService {
  public get(search: string) {
    return api.get('/api/v1/tags?search=' + search);
  }
}
