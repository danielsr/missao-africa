import axios from './axiosConfig';
import { Sponsor } from '../types';

export default {
    importSponsors(sponsors: Sponsor[]) {
        return axios.post('/persons-import', sponsors);
    },
    saveSponsors(sponsor: Sponsor) {
        return axios.post('/persons', sponsor);
    },
    getSponsors(search) {
        const query = new URLSearchParams();
        query.append('search', search);
        return axios.get(`/persons?${query.toString()}`);
    },
};
