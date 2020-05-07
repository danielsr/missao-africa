import axios from './axiosConfig';
import { Sponsor } from '../types';

export default {
    importSponsors(sponsors: Sponsor[]) {
        return axios.post('/persons-import', sponsors);
    },
};
