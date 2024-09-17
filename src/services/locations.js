import api from "./apiConfig.js";

export const getLocations = async () => {
  try {
    const response = await api.get(`/locations/`);
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

export const getLocation = async (id) => {
    try {
      const response = await api.get(`/locations/${id}`);
      return response.data;
    } catch (error) {
      console.log(error)
    }
  };

export const addLocation = async (locationData) => {
  try {
    const response = await api.post(`/locations/`, locationData);
    return response.data;
  } catch (error) {
    console.log(error)
  }
};