import { BaseApiService } from "./base-api.service";

class PhotosApiService extends BaseApiService {
  endpoints = {
    getList: "/photos",
    search: "/search/photos",
    getDetail: (id) => `/photos/${id}`,
    downloadDetail: (id) => `/photos/${id}/download`,
  };

  async getList({ page, per_page, orientation = "" }) {
    return await this.get(this.endpoints.getList, {
      params: {
        page,
        per_page,
        orientation,
      },
    });
  }

  async search({ page, per_page, query, orientation = "" }) {
    return await this.get(this.endpoints.search, {
      params: {
        page,
        per_page,
        query,
        orientation,
      },
    });
  }

  async getDetail({ id }) {
    return await this.get(this.endpoints.getDetail(id));
  }

  async downloadDetail({ url }) {
    return await this.get(url, { responseType: "blob" });
  }
}

export const photosApiService = new PhotosApiService();
