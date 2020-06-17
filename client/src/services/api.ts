import axios from './axiosConfig';
import { Sponsor, Label } from '../types';

export default {
  importSponsors(sponsors: Sponsor[]) {
    return axios.post('/persons-import', sponsors);
  },
  saveSponsors(sponsor: Sponsor) {
    return axios.post('/persons', sponsor);
  },
  getSponsors(search: string, pageIndex) {
    const query = new URLSearchParams();
    query.append('search', search);
    query.append('pageIndex', pageIndex);
    return axios.get(`/persons?${query.toString()}`);
  },
  getSponsor(id: number) {
    return axios.get(`/persons/${id}`);
  },
  login(payload) {
    return axios.post(`/login`, payload);
  },
  getLabels() {
    return axios.get('/labels');
  },
  saveLabel(label: Label) {
    return axios.post('/labels', label);
  },
};
