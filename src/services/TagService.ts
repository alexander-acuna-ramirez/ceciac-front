import { api } from 'src/boot/axios';

export class TagService {
    public get() {
        return api.get('/api/v1/tags');
    }
}