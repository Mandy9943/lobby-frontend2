import axios from "axios";
import { baseUrl } from ".";

export const researchSearchApiUrl = `${baseUrl}/api/search-research`;
const researchSearchApi = axios.create({
  baseURL: researchSearchApiUrl,
  withCredentials: true,
});

export default researchSearchApi;
