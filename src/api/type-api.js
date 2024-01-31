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

export const createType = async (name) => {
  try {
    const response = await api.post("/types", { name: name });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
