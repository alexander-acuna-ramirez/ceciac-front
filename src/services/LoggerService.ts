import { api } from 'src/boot/axios';
import { UserInteraction, UserInteractionDuration } from 'src/models';

export class LoggerService {
  public registerEvent(data: UserInteraction) {
    return api.post('/api/v1/log/activity', data);
  }
  public registerDuration(duration: UserInteractionDuration) {
    return api.post('/api/v1/log/duration', duration);
  }
}
