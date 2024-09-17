import api from "./apiConfig.js";

export const getItems = async (locationId) => {
  try {
    const response = await api.get(`/locations/${locationId}/items/`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getItem = async (locationId, itemId) => {
  try {
    const response = await api.get(`/locations/${locationId}/items/${itemId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addItem = async (locationId, itemData) => {
  try {
    const response = await api.post(`/locations/${locationId}/items/`, itemData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
