import { api } from "./api-config";

export const getAllFishes = async () => {
  try {
    const response = await api.get("/fish");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createFish = async (token, formData) => {
  try {
    const response = await api.post("/fish", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
