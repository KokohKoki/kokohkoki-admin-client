import { api } from "./api-config";

export const getAllTypes = async () => {
  try {
    const response = await api.get("/types");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
