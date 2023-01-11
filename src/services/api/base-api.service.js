import axios from "axios";

export class BaseApiService {
  service = axios.create({
    baseURL: "https://api.unsplash.com",
    headers: {
      Authorization: `Client-ID Qsb8kaK9RITnEZ4FxelqUYONoLHq6L69ihYJKq1L9jg`,
    },
  });

  get(url, config) {
    return this.service.get(url, config);
  }

  post(url, data, config) {
    return this.service.post(url, data, config);
  }
}
