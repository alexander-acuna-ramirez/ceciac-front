import { api } from 'src/boot/axios';
import { Event } from 'src/models/Event';

export class EventService {
  public async store(e: Event) {
    return api.post('/api/v1/event', e);
  }

  public async uploadEventFile(file: FormData, id: string | number) {
    return api.post('/api/v1/event/upload-file/' + id, file);
  }
}
