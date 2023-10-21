import { api } from 'src/boot/axios';


export class CeciacService {
  list() {
    return api.get('api/v1/ceciac');
  }

  check() {
    return api.get('api/v1/ceciac-permissions');
  }

  create(data: any) {
    return api.post('api/v1/ceciac', data)
  }

  update(id: string, data: any) {
    return api.put('api/v1/ceciac/' + id, data)
  }

  uploadFile(file: FormData, id: string | number) {
    return api.post('/api/v1/ceciac/upload-file/' + id, file);
  }

  uploadImage(file: FormData, id: string | number) {
    return api.post('/api/v1/ceciac/upload-image/' + id, file);
  }

  deletePublication(id: string | number) {
    return api.delete('/api/v1/ceciac/' + id);
  }

  downloadFile(id: string) {
    return api.get('/api/v1/ceciac/download-file/' + id);
  }
}
