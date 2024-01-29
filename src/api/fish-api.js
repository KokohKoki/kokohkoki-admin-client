import { api } from "./api-config";

export const getAllFishes = async () => {
  try {
    const response = await api.get("/fish/search?sort=desc");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
