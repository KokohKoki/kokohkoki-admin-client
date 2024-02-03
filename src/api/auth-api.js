import { api } from "./api-config";

export const updateUser = async (token, userId, username, password) => {
  try {
    const response = await api.put(
      `/user/${userId}`,
      { username, password },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
