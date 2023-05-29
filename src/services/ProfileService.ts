import { Experience, Education } from 'src/models';
import { api } from 'src/boot/axios';

export class ProfileService {
  public loadProfile(profileId: string | number) {
    return api.get('/api/v1/profile/' + profileId);
  }
  public async uploadLogo(file: FormData) {
    return api.post('/api/v1/profile/upload-logo', file);
  }
  public async uploadBanner(file: FormData) {
    return api.post('/api/v1/profile/upload-banner', file);
  }
  public async updateBasicInformation(data: any) {
    return api.post('/api/v1/profile/update-basic-info', data);
  }
  public async updateAboutMe(data: any) {
    return api.post('api/v1/profile/update-about-me', data);
  }
  public async createExperience(experience: Experience) {
    return api.post('api/v1/profile/add-experience', experience);
  }
  public async loadExperiences(id: string | number) {
    return api.get('api/v1/profile/experiences/' + id);
  }
  public async createEducation(education: Education) {
    return api.post('api/v1/profile/add-education', education);
  }
  public async loadEducation(id: string | number) {
    return api.get('api/v1/profile/education/' + id);
  }
}
