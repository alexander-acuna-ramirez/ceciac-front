import { api } from 'src/boot/axios';
import { Event } from 'src/models/Event';
import { EventBasicInformation } from 'src/interfaces/EventBasicInformation';

export class EventService {
  public show(id: string | number) {
    return api.get('/api/v1/event/' + id);
  }

  public store(e: Event) {
    return api.post('/api/v1/event', e);
  }

  public uploadEventFile(file: FormData, id: string | number) {
    return api.post('/api/v1/event/upload-file/' + id, file);
  }

  public loadNetworkEvents(
    page: string | number,
    perpage: string | number,
    sortBy: string | null = null,
    network: number | string | null = null
  ) {
    let url: string = '/api/v1/event?page=' + page + '&perpage=' + perpage;
    if (network != null) {
      url += '&network=' + network;
    }
    if (sortBy != null) {
      url += '&sortBy=' + sortBy;
    }
    return api.get(url);
  }

  public checkAccess(id: string) {
    return api.get('api/v1/event/access/' + id);
  }

  public updateEvent(eventId: number, eventData: EventBasicInformation) {
    const url = `api/v1/event/${eventId}`;
    return api.put(url, eventData);
  }

  public deleteEvent(eventId: string) {
    return api.delete('api/v1/event/' + eventId);
  }

  public updateEventContent(eventId: string | number, content: string) {
    return api.put('api/v1/event/update-content/' + eventId, { 'event_content': content });
  }

  public storeEventTags(event: string | number, tags: number[]) {
    return api.post('api/v1/event/tags/' + event, { tags });
  }

  public participate(event: string | number) {
    return api.post('api/v1/event/participate/' + event);
  }

  public participation(event: string | number) {
    return api.get('api/v1/event/event-participation/' + event);
  }

  public eventParticipants(
    event: string,
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


    return api.get('api/v1/event/participants/' + event + '?' + queryParams.toString());

  }
}
