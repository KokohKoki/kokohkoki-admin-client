import { api } from "./api-config";

export const getAllEvents = async () => {
  try {
    const response = await api.get("/events");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
