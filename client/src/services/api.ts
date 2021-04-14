import axios from './axiosConfig';
import { Person, Label } from '../types';
import { AxiosResponse } from 'axios';

export default {
  importPeople(people: Person[]) {
    return axios.post('/persons-import', people);
  },
  savePerson(person: Person) {
    return axios.post('/persons', person);
  },
  getPeople(search: string, pageIndex) {
    const query = new URLSearchParams();
    query.append('search', search);
    query.append('pageIndex', pageIndex);
    return axios.get(`/persons?${query.toString()}`);
  },
  getPerson(id: number) {
    return axios.get(`/persons/${id}`);
  },
  login(payload) {
    return axios.post(`/login`, payload);
  },
  getLabels(): Promise<AxiosResponse<Label[]>> {
    return axios.get('/labels');
  },
  saveLabel(label: Label) {
    return axios.post('/labels', label);
  },
  checkEmail(email: string) {
    const query = new URLSearchParams();
    query.append('email', email);
    return axios.get(`/persons/check-email?${query.toString()}`);
  },
};
