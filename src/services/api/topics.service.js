import { BaseApiService } from "./base-api.service";

class TopicsApiService extends BaseApiService {
  endpoints = {
    getList: "/topics",
  };

  async getList({ page, per_page }) {
    return await this.get(this.endpoints.getList, {
      params: {
        page,
        per_page,
      },
    });
  }
}

export const topicsApiService = new TopicsApiService();
