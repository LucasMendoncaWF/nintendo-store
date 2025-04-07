
import { HomeBannerModel } from "app/models/HomeBannerModel";
import api from "./api";

export async function getHomeBanners() {
  return await api.get<HomeBannerModel[]>("mocks/homeBanners", {
  }).catch((error) => {
    return error.response.data; 
  });
}

export async function getSecondaryBanners() {
  return await api.get<HomeBannerModel[]>("mocks/secondaryBanners", {
  }).catch((error) => {
    return error.response.data; 
  });
}